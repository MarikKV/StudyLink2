import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import '../styles/Journal.scss';

export default function Journal() {

    const user = useSelector(state => state.saveStudentInfo);
    const [sheet_url, setSheet] = useState('');
    const [public_sheet_url, setPublickSheet] = useState('');

    useEffect(()=>{
        db.collection("Groups")
        .where('name', '==', user.group)
        .get()
        .then( snapsot => {
            const data = snapsot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setSheet(data[0].journal)
            setPublickSheet(data[0].journal_public)
        })
        .catch( error => {
            console.log(error)
        });
    })
    return (
        <div className="journal_container">
            <h1 align="center">Журал групи {user.group}</h1>
            <h2 align="center">Посилання на журнал у google <a href={sheet_url}>тут</a></h2>

            {console.log(user)}

            <iframe className="journal" width="900px" height="400px" src={public_sheet_url}></iframe>
        </div>
    )
}
