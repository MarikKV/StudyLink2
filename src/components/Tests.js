import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
export default function Temes() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [tests, setTests] = useState([]);

    useEffect(()=>{
        if(status === 'Student'){
            
            db.collection("Tests").doc("0").set([
                {
                    level: 1,
                    question: "Скільки заголовків є у HTML?",
                    variants: [
                        "3", "4", "6", "8"
                    ],
                    unsver: "6"
                }
            ])
            .then( res => console.log(res))
            .catch( error => console.log(error) );

            db.collection("Tests")
            .get()
            .then( snapsot => {
                const data = snapsot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTests(data);
            })
            .catch( error => console.log(error) );
        }
    },[status, user.group, user.kurs])

    return (
        <div>
            {isLogged ? 
            <>
                {console.log(tests)}
                <h1>Тести по пройденим темам</h1>
            </>
            :
            <h1 align="center">Увійдіть щоб проходити тести</h1>
            }
        </div>
    )
}
