import React, { useState } from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';

export default function AddStudent(props) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [kurs, setKurs] = useState('');

    const myStyle = {
        width: '50%',
        marginLeft: '25%'
    }
    const mystyle2 = {
        background: "lightpink"
    }
    
    function addStudnetToDb(e, group){
        e.preventDefault();
        let data = {
            group,
            name,
            phone,
            password: phone,
            kurs,
            groupId: group.id
        }
        console.log(data)
        db.collection("Students").doc().set(data)
        setName('');
        setPhone('');
        props.refresh()
    }
    return (
        <div>
            <Accordion>
                {props.groups.map( (group, index) => 
                    <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={index.toString()} className="d-flex justify-content-between" style={group.inActive ? mystyle2: null}>
                            {group.school} - {group.name}
                            <span>{props.students.filter(student => student.group == group.name).length}</span>
                        </Accordion.Toggle>
                    
                        <Accordion.Collapse eventKey={index.toString()}>
                            <Card.Body>
                                <Form style={myStyle}  onSubmit={e => addStudnetToDb(e, group.name)}>
                                    <Form.Group controlId="formGroupNewStudentName">
                                        <Form.Label>Ім'я Прізвище</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Ім'я і прізвище" 
                                            value={name}
                                            onChange={e => setName(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupNewStudentPhone">
                                        <Form.Label>телефон учня/батьків (пароль)</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Телефон" 
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Курс (вибір)</Form.Label>
                                        <Form.Control as="select" onChange={e=>setKurs(e.target.value)}>
                                            <option></option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </Form.Control>
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
