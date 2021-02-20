import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { db } from '../firebase';

export default function AddStudent(props) {
    
    const admin = useSelector(state => state.admin);

    const [thema, setThema] = useState('html-css');
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState('');
    const [variants, setVariants] = useState([]);
    const [bad, setBad] = useState('');
    const [unsver, setUnsver] = useState('');

    const myStyle = {
        width: '50%',
        marginLeft: '25%'
    }
    const myStyle2 = {
        minWidth: '180px',
        marginLeft: '10px'
    }

    function addTestToDb(e){
        e.preventDefault();
        let data = {
            level,
            question,
            variants,
            unsver
        }
        if( question !== '' && variants !== [] && unsver !=="" ){
            data = {
                level,
                question,
                variants,
                unsver
            }

            console.log(data)
            db.collection("Tests").doc(thema).set(data)

            setThema('html-css');
            setLevel(1);
            setQuestion('');
            setVariants([]);
            setUnsver('');
        } else{
            alert('Помилка додавання тесту')
        }
    }
    function addBadVariant(){
        console.log(variants)
        if(bad.length > 0){
            let vari = []; 
            variants !== [] ? vari = variants : vari = [];
            let new_variants = vari.push(bad);
            setVariants(new_variants);
        }
    }
    if(admin){
    return (
        <div>
            
            <h1 align='center' className="my-4">Додати тесту до теми {thema}</h1>
            <Form style={myStyle} onSubmit={e=>addTestToDb(e)}>

                <div className="row justify-content-between m-0 p-0">
                    <Form.Group controlId="formGroupVideo" className="col-lg-5 p-0">
                        <Form.Label>Тест до курсу</Form.Label>
                        <Form.Control as="select" onChange={e=>setThema(e.target.value)}>
                            <option>html-css</option>
                            <option>js</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formGroupVideo" className="col-lg-5 p-0">
                        <Form.Label>Складність тесту ( від 1 до 3 )</Form.Label>
                        <Form.Control as="select" onChange={e=>setLevel(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <Form.Group controlId="formGroupTema">
                    <Form.Label>Питання</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="введіть питання..." 
                        onChange={e=>setQuestion(e.target.value)}/>
                </Form.Group>
                
                <Form.Group controlId="formGroupTema">
                    <Form.Label>Відповідь</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="введіть правильну відповідь..." 
                        onChange={e=>setUnsver(e.target.value)}/>
                </Form.Group>

                { variants.length > 0 ? variants.map( (index, variant) => (
                   <p key={index}>{variant}</p>
                )): null} 

                <Form.Group controlId="formGroupTema">
                    <Form.Label>Невірний варіант</Form.Label>
                    <div className="d-flex">
                        <Form.Control 
                            type="text" 
                            placeholder="введіть невірний варіант..." 
                            onChange={e=>setBad(e.target.value)}/>
                        <Button variant="primary" style={myStyle2} onClick={addBadVariant}>
                            Додати варіант
                        </Button>
                    </div>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Додати тест
                </Button>
            </Form>
            
        </div>
    )
    }
}
