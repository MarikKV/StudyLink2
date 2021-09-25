import React, { useState } from 'react';
import { Accordion, Card, Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';

export default function AddStudent(props) {

    const [name, setName] = useState('');
    const [school, setSchool] = useState('');
    const [kurs, setKurs] = useState('');

    const myStyle = {
        width: '50%',
        marginLeft: '25%'
    }

    function addGroupToDb(e){
        e.preventDefault();
        let data = {
            name,
            school,
            kurs,
            temes_pass: 0,
            temes2_pass: 0, 
            temes3_pass: 0
        }
        let groupsNames = [];
        props.groups.map(group => {if(group.school == school){ groupsNames.push(group.name) }})
        if(name !== '' && school !=='' && kurs !== '' && groupsNames.indexOf(name) === -1){
            db.collection("Groups").doc().set(data)
            setName('');
            setSchool('');
            setKurs('');
            props.refresh()
        } else{
            alert('Група з такою назвою вже існує!')
        }
    }
    return (
        <div>
            <Accordion>
                {props.schools.map( (school, index) => 
                    <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                            {school.name}
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey={index.toString()}>
                            <Card.Body>
                                <h3>Існуючі групи</h3>
                                {props.groups.map( (group, index)=>
                                    group.school === school.name ? <span key={index}>&nbsp;&nbsp;{group.name} </span> : null
                                )}
                                <Form style={myStyle} onSubmit={e=>addGroupToDb(e)}>
                                    <Form.Group controlId="formGroupNewGroup1">
                                        <Form.Label>Назва гурпи</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="SL-106 / SL-201"
                                            value={name}
                                            onChange={e=>setName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Школа (вибір)</Form.Label>
                                        <Form.Control as="select" onChange={e=>setSchool(e.target.value)}>
                                            <option></option>
                                            {props.schools.map((school,idx)=>
                                                <option key={idx}>{school.name}</option>
                                            )}
                                        </Form.Control>
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
