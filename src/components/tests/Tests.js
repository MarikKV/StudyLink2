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
    const [testIndex, setTestIndex] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    const loadNewTest = function(test, testIndex){
        setTest(test);
        setTestIndex(testIndex)
    }
    
    useEffect(()=>{
        let timer;
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
                let timeForTest = data[0].time;
                let i=0;
                loadNewTest(data[i], i)
                setTimeLeft(data[i].time)
                timer = setInterval(()=>{
                    timeForTest--;
                    if(timeForTest<=0){
                        i++;
                        loadNewTest(data[i], i);
                        timeForTest = data[i].time;
                    }
                    setTimeLeft(timeForTest)
                    if(i >= data.length - 1){clearInterval(timer)}
                }, 1000)
            })
            .catch( error => console.log(error) );
        }
        return () => clearInterval(timer);
    },[status, user.group, user.kurs])

    return (
        <div className="container">
            {isLogged ? 
            <>
                <h1 className="text-center mt-3">Тести по пройденим темам</h1>
                <Test test={test} testIndex={testIndex} timeLeft={timeLeft}/>
            </>
            :
            <h1 className="text-center mt-3">Увійдіть щоб проходити тести</h1>
            }
            
        </div>
    )
}
