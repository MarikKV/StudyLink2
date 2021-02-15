import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

export default function TemesForKurs(props) {
    return (
        <Accordion defaultActiveKey="0" align='left'>
            {
                props.temes.map((item, idx)=>(
                    <Card key={item.tema}>
                        <Accordion.Toggle as={Card.Header} eventKey={item.tema}>
                            <b>{idx+1}. {item.tema}</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.tema}>
                        <Card.Body>
                            {(item.task[0] !== "") ? 
                            <div>
                                <h5 align="left" style={{color: '#196ff7'}}><i className="fas fa-tasks"></i> Завдання</h5>
                                <ol>
                                {item.task.map(item =>(
                                    <li align='left' style={{fontSize: '20px'}} key={item}><a href={'https://kosaniakmarianone.github.io/html-css/' + item} target='blank'>Завдання</a></li>
                                ))}
                                </ol>
                            </div>: ''
                            }
                            {(item.materials !== "") ? <h5 align='left'><a href={item.materials} target='blank'>
                                <i className="fab fa-google-drive"></i> Матеріали</a></h5> : ''}
                            {(item.video !== "") ? <h5 align='left'><a href={item.video} target='blank'><i className="fab fa-youtube"></i> Відео</a></h5> : ''}
                            {(item.video === "" && item.materials === "" && item.task[0] === "") ? 'Тема не відкрита, або розглядається лише на занятті': ''}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))
            }
        </Accordion>
    )
}
