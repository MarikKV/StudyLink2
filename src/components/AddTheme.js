import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { db } from '../firebase';

export default function AddStudent(props) {
    
    const admin = useSelector(state => state.admin);

    const [num, setNum] = useState('');
    const [tema, setTema] = useState('');
    const [video, setVideo] = useState('');
    const [tasks, setTasks] = useState(0);
    const [materials, setMaterials] = useState('');

    const myStyle = {
        width: '50%',
        marginLeft: '25%'
    }

    function addTheme2ToDb(e){
        e.preventDefault();
        let data = {
            tema,
            video,
            tasks,
            materials
        }
        if( tema !== '' && video !== '' && tasks > 0 ){
            let allNewTask = [];
            for(let i = 1; i <= tasks; i++){
                allNewTask.push(`t${num}/z${i}`);
            }
            data = {
                tema,
                video,
                task: allNewTask,
                materials
            }
            console.log(data)
            db.collection("Temes2").doc(num).set(data)

            setNum('');
            setTema('');
            setVideo('');
            setTasks('');
            setMaterials('');
        } else{
            alert('Помилка додавання теми')
        }
    }
    if(admin){
    return (
        <div>
            
            <h1 align='center'>Додати тему до курсу JavaScript</h1>
            <Form style={myStyle} onSubmit={e=>addTheme2ToDb(e)}>

                <Form.Group controlId="formGroupNum">
                    <Form.Label>Номер теми</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="1,2,3..." 
                        value={num}
                        onChange={e=>setNum(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formGroupTema">
                    <Form.Label>Назва теми</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="js" 
                        value={tema}
                        onChange={e=>setTema(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formGroupVideo">
                    <Form.Label>Відео</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="https://...." 
                        value={video}
                        onChange={e=>setVideo(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formGroupVideo">
                    <Form.Label>Матеріали</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="https://...." 
                        value={materials}
                        onChange={e=>setMaterials(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formGroupVideo">
                    <Form.Label>Кількість завдань</Form.Label>
                    <Form.Control as="select" onChange={e=>setTasks(e.target.value)}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>

                
                <Button variant="primary" type="submit">
                    Додати
                </Button>
            </Form>
            
        </div>
    )
    }
}
