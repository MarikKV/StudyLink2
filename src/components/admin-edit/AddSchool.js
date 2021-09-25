import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../firebase';

export default function AddStudent(props) {

    const [name, setName] = useState('');

    const myStyle = {
        width: '50%',
        marginLeft: '25%'
    }

    function addSchoolToDb(e){
        e.preventDefault();
        let data = {
            name
        }
        let schoolsNames = [];
        props.schools.map(school => schoolsNames.push(school.name))
        if(name !== '' && schoolsNames.indexOf(name) === -1){
            db.collection("Schools").doc().set(data)
            setName('');
        } else{
            alert('Школа з такою назвою вже існує!')
        }
        props.refresh()
    }
    return (
        <div>
            <Form style={myStyle} onSubmit={e=>addSchoolToDb(e)}>
                <Form.Group controlId="formGroupText">
                    <Form.Label>Назва школи</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Надія / Сихів / ..." 
                        value={name}
                        onChange={e=>setName(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Додати
                </Button>
            </Form>  
        </div>
    )
}
