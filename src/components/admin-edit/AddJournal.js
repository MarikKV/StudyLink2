import React, { useState } from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';

export default function AddJournal(props) {

    const myStyle = {
        width: '90%',
        marginLeft: '5%'
    }
    const mystyle2 = {
        background: "lightpink"
    }

    function editGroup(e, group){
        e.preventDefault();
        if(group==null) return

        if(group.journal && group.journal_public){
            console.log(group)
            
            db.collection("Groups").doc(group.id).set(group)
            props.refresh()
            
        } else{
            alert('Невірне посилання на журнал')
        }
    }
    return (
        <div>
            <Accordion>
            {props.groups.map( (group, index) => 
                <Card key={index}>
                    <Accordion.Toggle as={Card.Header} eventKey={index.toString()} className="d-flex justify-content-between" style={group.inActive ? mystyle2: null}>
                        <span>{group.school} - {group.name}</span>
                        <span> 
                            {group.journal_public != null && group.journal != null ? "✔" : "❌"}
                        </span>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                            <Form style={myStyle}  onSubmit={e => editGroup(e, group)}>
                                <Form.Group controlId="formGroupNewStudentName">
                                    <Form.Label>Лінк на журнал</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Лінк на журнал" 
                                        value={group.journal}
                                        onChange={e => {group.journal = e.target.value}}/>
                                </Form.Group>
                                <Form.Group controlId="formGroupNewStudentPhone">
                                    <Form.Label>Публічний лінк на журнал</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Публічний лінк на журнал" 
                                        value={group.journal_public}
                                        onChange={e => {group.journal_public = e.target.value}}/>
                                </Form.Group>
                                <Form.Group controlId="formGroupActive">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Зянняття більше не проводяться"
                                        defaultChecked={group.inActive ? true : false}
                                        onChange={e => {group.inActive = e.target.checked}}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Додати
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    </div>
    )
}
