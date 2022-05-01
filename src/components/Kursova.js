import React, { useState, useEffect, useRef } from 'react';
import '../styles/Kursova.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { db } from '../firebase';
import { Form, Button } from 'react-bootstrap';

export default function Kursova() {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const kursach_1 = useRef("");
    const kursach_2 = useRef("");
    const kursach_3 = useRef("");

    console.log(user);
    
    const updateUserKursach = async function(){
        const userInfo = (await db.collection("Students").doc(user.id).get()).data();
        console.log(userInfo)
        kursach_1.current = userInfo.kursach_1;
        kursach_2.current = userInfo.kursach_2;
        kursach_3.current = userInfo.kursach_3;
    }
    const getOldLinkValues = async function(){
        const userInfo = (await db.collection("Students").doc(user.id).get()).data();
        kursach_1.current.value = userInfo.kursach_1 != undefined ? userInfo.kursach_1 : ""; 
        if(kursach_2.current){
            kursach_2.current.value = userInfo.kursach_2 != undefined ? userInfo.kursach_2 : ""; 
        }
        if(kursach_3.current){
           kursach_3.current.value = userInfo.kursach_3 != undefined ? userInfo.kursach_3 : ""; 
        }
    }
    useEffect(() => {
        getOldLinkValues();
    }, [user])

    if(!isLogged){ return <Redirect to='/login'/>}
    return (
        <div>
            {!isLogged 
                ? 
                <h1 className="text-center mt-5">Протрібно увійти</h1>
                :
                <>
                    <div className="container">
                        <h1 className="text-center mt-5">Псилання на курсові роботи</h1>
                        <Form className="mt-5">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Курсова робота №1 (HTML/CSS)</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control type="email" placeholder="Link on github" ref={kursach_1} />
                                    <a className='link-primary ml-3' target="_blank" href="#">show</a>
                                </div>
                            </Form.Group>

                            {
                                user.kurs > 1 ?
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Курсова робота №1 (HTML/CSS)</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control type="email" placeholder="Link on github" ref={kursach_2} />
                                        <a className='link-primary ml-3' target="_blank" href="#">show</a>
                                    </div>
                                </Form.Group>
                                : null
                            }

                            {
                                user.kurs > 2 ?
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Курсова робота №1 (HTML/CSS)</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control type="email" placeholder="Link on github" ref={kursach_2} />
                                        <a className='link-primary ml-3' target="_blank" href="#">show</a>
                                    </div>
                                </Form.Group>
                                : null
                            }

                            <Button type="button" onClick={() => updateUserKursach()}>Зберегти</Button>
                        </Form>
                    </div>
                </>
            
            }
        </div>
    )
}
