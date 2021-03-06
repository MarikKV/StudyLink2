import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import { db } from '../firebase';


export default function HomeTeacher() {
    const state = useSelector(state => state.saveStudentInfo);

    const [groups, setGroups] = useState([]);

    const [reloadData, setReloadData] = useState(false);

    useEffect(()=>{

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

            
        })
        .catch( error => {
            console.log(error)
        });

    },[reloadData, state.school])

    function refresh(){
        setReloadData(!reloadData)
    }

    const addThema = (id, temes, kurs) => {
        console.log('add', kurs, id, temes)
        if(kurs === 2){
            db.collection("Groups").doc(`${id}`).update({
                temes2_pass: temes + 1
            })
            .then( refresh() )
            .catch( error => console.log(error));
        } if(kurs === 1){
            db.collection("Groups").doc(`${id}`).update({
                temes_pass: temes + 1
            })
            .then( refresh() )
            .catch( error => console.log(error));
        }   
    }
    const removeThema = (id, temes, kurs) => {
        if(kurs === 2){
            db.collection("Groups").doc(`${id}`).update({
                temes2_pass: temes - 1
            })
            .then( refresh() )
            .catch( error => console.log(error));
        } if(kurs === 1){
            db.collection("Groups").doc(`${id}`).update({
                temes_pass: temes - 1
            })
            .then( refresh() )
            .catch( error => console.log(error));
        }   
    }
    return (
        <div>
            <Table style={{width: '80%', marginLeft: '10%'}}>
                <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th>#</th>
                        <th>Група</th>
                        <th>Відкрито тем</th>
                        <th>Додати тему</th>
                        <th>Відняти тему</th>
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}}>
                    {groups.map((group, idx) => 
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{group.name}</td>
                            <td><b>{group.kurs === '2' ? group.temes2_pass : group.temes_pass}</b></td>
                            <td>
                                <Button 
                                    variant='primary' 
                                    onClick={() => addThema(group.id, group.kurs === '2' ? group.temes2_pass : group.temes_pass, group.kurs === '2' ? 2 : 1)}
                                    >+</Button>
                            </td>
                            <td>
                                <Button 
                                    variant='danger' 
                                    onClick={() => removeThema(group.id, group.kurs === '2' ? group.temes2_pass : group.temes_pass, group.kurs === '2' ? 2 : 1)}
                                    >-</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}
