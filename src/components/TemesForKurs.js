import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

export default function TemesForKurs(props) {
    return (
        <Accordion defaultActiveKey="0" align='left'>
            {
                props.temes.map((item, idx)=>(
                    <Card key={item.tema}>
                        <Accordion.Toggle as={Card.Header} eventKey={item.tema}>
                            <b>{idx+1} {item.tema}</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.tema}>
                        <Card.Body>
                            {(item.task[0] !== "") ? 
                            <div>
                                <h5 align="left">Завдання</h5>
                                <ol>
                                {item.task.map(item =>(
                                    <li align='left' key={item}><a href={'https://kosaniakmarianone.github.io/' + item} target='blank'>Завдання</a></li>
                                ))}
                                </ol>
                            </div>: ''
                            }
                            {(item.materials !== "") ? <h5 align='left'><a href={item.materials} target='blank'>Матеріали</a></h5> : ''}
                            {(item.video !== "") ? <h5 align='left'><a href={item.video} target='blank'>Відео</a></h5> : ''}
                            {(item.video === "" && item.materials === "" && item.task[0] === "") ? 'Тема не відкрита, або розглядається лише на занятті': ''}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))
            }
        </Accordion>
    )
}
