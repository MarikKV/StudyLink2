import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { Form, Button } from 'react-bootstrap';
export default function Temes() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [tests, setTests] = useState([]);

    const time         = useRef(30);
    const kurs         = useRef(1);
    const tema         = useRef(1);
    const question     = useRef();
    const unsverRight  = useRef();
    const unsverFalse1 = useRef();
    const unsverFalse2 = useRef();
    const unsverFalse3 = useRef();

    const saveTest = () => {
        const test = {
            question: question.current.value,
            unsverRight: unsverRight.current.value,
            kurs: kurs.current.value || 1,
            tema: tema.current.value || 1,
            variants: [
                unsverRight.current.value, 
                unsverFalse1.current.value, 
                unsverFalse2.current.value, 
                unsverFalse3.current.value
            ],
            time: time.current.value || 30,
        }
    
        db.collection("Tests").doc().set(test)
        .then( res => console.log(res))
        .catch( error => console.log(error) );
    }

    const delTest = (id) =>{
        console.log('deleted', id)
        db.collection("Tests").doc(id).delete()
        .then( res => console.log("Deleted - ", id))
        .catch( error => console.log(error) );
    }

    useEffect(()=>{
        if(isLogged){
            db.collection("Tests")
            .get()
            .then( snapsot => {
                const data = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log(data)
                setTests(data);
            })
            .catch( error => console.log(error) );
        }
    },[status, user.group, user.kurs])

    return (
        <div className="container">
            {isLogged ? 
            <>
                <h1 className="text-center mt-3">Тести по пройденим темам</h1>
            </>
            :
            <h1 className="text-center mt-3">Увійдіть щоб проходити тести</h1>
            }
            
            <Form className="col-12 col-md-8 mx-auto">
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control ref={question} as="textarea" rows={2} placeholder="Enter question" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Right answer</Form.Label>
                    <Form.Control ref={unsverRight} as="textarea" rows={2} placeholder="Enter answer" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>False answer</Form.Label>
                    <Form.Control ref={unsverFalse1} as="textarea" rows={2} placeholder="Enter false answer" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>False answer</Form.Label>
                    <Form.Control ref={unsverFalse2} as="textarea" rows={2} placeholder="Enter false answer" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>False answer</Form.Label>
                    <Form.Control ref={unsverFalse3} as="textarea" rows={2} placeholder="Enter false answer" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Kurs</Form.Label>
                    <Form.Control ref={kurs} type="number" placeholder="1" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tema</Form.Label>
                    <Form.Control ref={tema} type="number" placeholder="1" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time in secunds</Form.Label>
                    <Form.Control ref={time} type="number" placeholder="30" />
                </Form.Group>

                <Button variant="primary" onClick={() => saveTest()}>
                    Submit
                </Button>
            </Form>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Question</th>
                        <th>Unsvers</th>
                        <th>del</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map( (element, idx) => (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{element.question}</td>
                            <td>
                                {element.variants?.map( (unsver, idx) => (
                                    <p key={idx} className="text-left p-0">{unsver}</p>
                                ))}
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={()=>delTest(element.id)}
                                >
                                delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
