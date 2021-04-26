import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { db } from '../firebase';


import AdminAdd from './AdminAdd';

export default function Admin() {

    const myStatus = useSelector(state => state.status);

    const [schools, setSchools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);

    const [reloadData, setReloadData] = useState(false);

    const list = {
        width: '80%',
        marginLeft: '10%'
    }

    useEffect(()=>{
        db.collection("Schools")
        .get()
        .then( snapsot => {
            const data = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setSchools(data)
        })
        .catch( error => {
            console.log(error)
        });
        
        db.collection("Groups")
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
        })
        .catch( error => {
            console.log(error)
        });

        
        db.collection("Students")
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
        console.log('refreshed')
    },[reloadData])

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

        db.collection("Students")
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

    if(myStatus !== 'Admin') return <Redirect to='Home'/>
    return (
        <div>
            <AdminAdd schools={schools} groups={groups} students={students} refresh={() => refresh()}/>

            <h1 align="center">Загальна статистика</h1>
            <div style={list}>
            { schools.length > 0 ? schools.map((school, idx) => (
                <div key={idx}>
                    <h1 align="center">{school.name}</h1>

                    {groups.map((group, index)=>(
                        group.school === school.name ?
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
                        : null
                    ))}
                    
                </div>
            )): null}
            </div>
            
        </div>
    )
}
