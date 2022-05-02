import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { db } from '../../firebase';


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

    const getSchools = async function(){
        const db_schools = [];
        (await db.collection("Schools").get()).forEach(school => db_schools.push( {id: school.id, ...school.data()} ))
        setSchools(db_schools);
    }

    const getGroups = async function(){
        const db_groups = [];
        (await db.collection("Groups").get()).forEach(group => db_groups.push( {id: group.id, ...group.data()} ));
        db_groups.sort((a,b) => { return a.school.toUpperCase() > b.school.toUpperCase() ? 1 : -1 })
        setGroups(db_groups);
        return db_groups
    }

    const getStudents = async function(){
        const db_students = [];
        (await db.collection("Students").get()).forEach(student => db_students.push( {id: student.id, ...student.data()} ));
        setStudents(db_students);
    }

    useEffect(() => {
        getSchools();
        getGroups();
        getStudents();
    },[reloadData])

    function refresh(){
        setReloadData(!reloadData)
    }
    function delStudent(id){
        console.log(id)
        db.collection('Students').doc(id).delete()
        .then( () => { console.log("Student successfully deleted!") })
        .catch( err => {console.error("Error removing student: ", err) });   

        getStudents();
    }

    let num = 1;
    let groupN = '';
    const drawStudnets = (school, studSchool, studGroupID, groupID, idx, name, phone, id, lastLogin, kursova_1, kursova_2, kursova_3) => {
        if(groupN !== groupID){
            groupN = groupID;
            num = 1
        }
        if(studGroupID === groupID ?? school === studSchool){
            let day;
            let hours;
            let minutes;
            let year;
            let month;
            var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
            let span;
            if(lastLogin != null){
                let lastdate = new Date(lastLogin);
                console.log()
                month = months[lastdate.getMonth()];
                day = lastdate.getDate();
                hours = lastdate.getHours();
                minutes = "0" + lastdate.getMinutes();
                year = lastdate.getFullYear();
                span = <span>{hours}:{minutes} <br/> {day}/{month}/{year}</span>
            }
            return (
                <tr key={idx}>
                    <td>{num++}</td>
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>
                        {kursova_1 ? <span><a href={kursova_1} target="_blank">Курсова №1</a><br/></span> : null }
                        {kursova_2 ? <span><a href={kursova_2} target="_blank">Курсова №2</a><br/></span> : null }
                        {kursova_3 ? <span><a href={kursova_3} target="_blank">Курсова №3</a><br/></span> : null }
                    </td>
                    <td className="text-center">{lastLogin != null ? span : ""}</td>
                    <td className="text-center">{Date.now() <= lastLogin + 10800000 ? "✅" : "❌"}</td>
                    <td><Button variant="danger" className="btn-sm" onClick={() => delStudent(id)}>Видалити</Button></td>
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
                            <Table striped bordered hover className="table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ім'я</th>
                                        <th>Номер телефону</th>
                                        <th>Курсові роботи</th>
                                        <th>Останній вхід</th>
                                        <th>Логування на занятті</th>
                                        <th>Видалити учня</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, idx) => 
                                        drawStudnets(
                                            school.name, 
                                            student.school, 
                                            student.groupId, 
                                            group.id, 
                                            idx, 
                                            student.name, 
                                            student.phone, 
                                            student.id, 
                                            student.lastLogin,
                                            student.kursach_1,
                                            student.kursach_2,
                                            student.kursach_3
                                        )   
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
