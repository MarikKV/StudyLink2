import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { Table, Button } from 'react-bootstrap';
import AddStudent from './AddStudent';


export default function HomeTeacher() {
    const state = useSelector(state => state.saveStudentInfo);

    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);

    const [reloadData, setReloadData] = useState(false);

    useEffect(()=>{
        let uniqueGroups=[];

        db.collection("Groups")
        .where('school', '==', state.school)
        .get()
        .then( snapsot => {
            const data = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            data.sort((a,b) =>{ 
                if( a.school.toUpperCase() > b.school.toUpperCase() ){
                    return 1
                } else {
                    return -1
                }
            })
            setGroups(data)

            uniqueGroups = data.map(group => group.name);

            db.collection("Students")
            .where('group', 'in', uniqueGroups)
            .get()
            .then( snapsot => {
                const data = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setStudents(data)
            })
            .catch( error => {
                console.log(error)
            });
        })
        .catch( error => {
            console.log(error)
        });

    },[reloadData, state.school])

    const myStyle1 = {
        width: '70%',
        marginLeft: '15%'
    }
    const list = {
        width: '80%',
        marginLeft: '10%'
    }

    function refresh(){
        setReloadData(!reloadData)
    }

    function delStudent(id){
        console.log(id)
        db.collection('Students').doc(id).delete()
        .then(() => {
            console.log("Student successfully deleted!");
        }).catch( err => {
            console.error("Error removing student: ", err);
        });   

        refresh();
    }

    let num = 1;
    let groupN = '';
    const drawStudnets = (studGroup, groupName, idx, name, phone, id) => {
        if(groupN !== groupName){
            groupN = groupName;
           num = 1
        }
        if(studGroup === groupName){
         return (
            <tr key={idx}>
                <td>{num++}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td><Button variant="danger" onClick={() => delStudent(id)}>Видалити</Button></td>
            </tr> 
            )
        }
        
    }
    return (
        <div>
            <div style={myStyle1}>
                <h1 align='center'>Додати учня в групу</h1>
                <AddStudent groups={groups} refresh={refresh}/>
            </div>

            <h1 align="center">Видалити учня та його данні</h1>
            <div style={list}>
                    {groups.map((group, index)=>(
                        <div key={index}>
                            <h1 align="center">{group.name}</h1>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ім'я</th>
                                        <th>Номер телефону</th>
                                        <th>Видалити учня</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, idx) => 
                                        drawStudnets(student.group, group.name, idx, student.name, student.phone, student.id)   
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    ))}
            </div>
        </div>
    )
}
