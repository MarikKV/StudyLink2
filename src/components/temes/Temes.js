import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import { db } from '../../firebase';
import TemesForKurs from './TemesForKurs';

export default function Temes() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [temes, setTemes] = useState([]);
    const [temesJS, setTemesJS] = useState([]);
    const [temesJS2, setTemesJS2] = useState([]);

    useEffect(()=>{
        if(status === 'Student'){
            db.collection("Groups")
            .where('name', '==', user.group)
            .get()
            .then( snapsot => {
                const data = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                
                    db.collection("Temes")
                    .get()
                    .then( snapsot => {
                        const alltemes = snapsot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                        alltemes.sort((a, b) => a.id - b.id);
                        if(user.kurs === '2'){
                            setTemes(alltemes)
                        } else {
                            const newTemes = alltemes.slice(0, data[0].temes_pass);
                            setTemes(newTemes)
                        }
                    })
                    .catch( error => {
                        console.log(error)
                    });

                    db.collection("Temes2")
                    .get()
                    .then( snapsot => {
                        const alltemesJS = snapsot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                        console.log(alltemesJS, "test")
                        alltemesJS.sort((a, b) => a.id - b.id);
                        
                        const newTemesJS = alltemesJS.slice(0, data[0].temes2_pass);
                        setTemesJS(newTemesJS)
                        console.log(temesJS)
                        
                    })
                    .catch( error => {
                        console.log(error)
                    });

                    db.collection("Temes3")
                    .get()
                    .then( snapsot => {
                        const alltemesJS2 = snapsot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                        alltemesJS2.sort((a, b) => a.id - b.id);
                        const newTemesJS2 = alltemesJS2.slice(0, data[0].temes3_pass);
                        setTemesJS2(newTemesJS2)
                        console.log(temesJS2, "test2")
                    })
                    .catch( error => {
                        console.log(error)
                    });
            })
            .catch( error => {
                console.log(error)
            });
        }
        else if( status === 'Teacher' || status === 'Admin'){
            db.collection("Temes")
            .get()
            .then( snapsot => {
                const alltemes = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                alltemes.sort((a, b) => a.id - b.id);
                setTemes(alltemes)
            })
            .catch( error => {
                console.log(error)
            });

            db.collection("Temes2")
            .get()
            .then( snapsot => {
                const alltemesJS = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                alltemesJS.sort((a, b) => a.id - b.id);
                setTemesJS(alltemesJS)
            })
            .catch( error => {
                console.log(error)
            });

            db.collection("Temes3")
            .get()
            .then( snapsot => {
                const alltemesJS2 = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                alltemesJS2.sort((a, b) => a.id - b.id);
                setTemesJS2(alltemesJS2)
                console.log(temesJS2)
            })
            .catch( error => {
                console.log(error)
            });
        } 
    },[status, user.group, user.kurs])

    return (
        <div>
            {isLogged ? 
            <>
                <h1 align='center'>Теми відкриті для {user.name} </h1>
                <div style={{width: '80%', marginLeft: '10%'}}>
                <Tabs defaultActiveKey="HTML/CSS" id="uncontrolled-tab-example">
                    <Tab eventKey="HTML/CSS" title="HTML/CSS">
                        <TemesForKurs temes={temes} prefix="html-css"/>
                    </Tab>
                    <Tab eventKey="JavaScript" title="JavaScript">
                        {user.kurs >= '2' || status === 'Teacher' || status === 'Admin'
                            ? 
                            <TemesForKurs temes={temesJS} prefix="/js"/>
                            :
                            <h1 align='center'>Цей курс для Вас не відкритий</h1>}
                    </Tab>
                    <Tab eventKey="JavaScript2" title="JavaScript (v2)">
                        {user.kurs >= '3' || status === 'Teacher' || status === 'Admin'
                            ? 
                            <TemesForKurs temes={temesJS2} prefix="/js_2"/>
                            :
                            <h1 align='center'>Цей курс для Вас не відкритий</h1>}
                    </Tab>
                </Tabs>
                <br/><br/><br/>
                <h5>Доступ до тем відкривається поступово. Виконані завдання зберігайте на своєму акаунті GitHub.
                    Якщо у вас проблеми з досупом до тем або ви помітите якусь помилку на сайті прохання сказати про це вчителю.
                </h5>
                <br/><br/><br/>
                </div>
            </>
            :
            <h1 align="center">Увійдіть щоб побачити теми</h1>
            }
        </div>
    )
}
