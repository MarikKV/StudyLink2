import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import Test from './Test'

export default function Tests() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [tests, setTests] = useState([]);
    const [test, setTest] = useState([]);

    const loadNewTest = function(test){
        setTest(test);
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
                
                loadNewTest(data[0], 0);
            })
            .catch( error => console.log(error) );
        }
    },[status, user.group, user.kurs])

    return (
        <div className="container">
            {isLogged ? 
            <>
                <h1 className="text-center mt-3">Тести по пройденим темам</h1>
                <Test test={test}/>
            </>
            :
            <h1 className="text-center mt-3">Увійдіть щоб проходити тести</h1>
            }
            
        </div>
    )
}
