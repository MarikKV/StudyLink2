import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import Test from './Test'

export default function Tests() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);
    const time_multilpier = 2;

    const [tests, setTests] = useState([]);
    const [test, setTest] = useState([]);
    const [testIndex, setTestIndex] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);

    const loadNewTest = function(test, testIndex){
        setTest(test);
        setTestIndex(testIndex)
    }
    const getTests = async function(){
        let timer;
        let tests = [];
        (await db.collection("Tests").get()).forEach(test => tests.push({id: test.id, ...test.data()}))
        setTests(tests);
            let timeForTest = tests[0].time * time_multilpier;
            let i = 0;
            loadNewTest(tests[i], i)
            setTimeLeft(tests[i].time * time_multilpier)
            timer = setInterval(()=>{
                timeForTest--;
                if(timeForTest <= 0){
                    i++;
                    loadNewTest(tests[i], i);
                    timeForTest = tests[i].time * time_multilpier;
                }
                setTimeLeft(timeForTest)
                if(i >= tests.length - 1){ clearInterval(timer) }
            }, 1000
        )
        return () => clearInterval(timer);
    }
    useEffect(()=>{
        if(isLogged){
            getTests();
        }
    },[status, user.group, user.kurs])

    return (
        <div className="container">
            {isLogged ? 
            <>
                <h1 className="text-center mt-3">Тести по пройденим темам</h1>
                <Test test={test} testIndex={testIndex} timeLeft={timeLeft}/>
                <div align="right">
                    <button className="btn btn-primary">Наступний</button>
                </div>
            </>
            :
            <h1 className="text-center mt-3">Увійдіть щоб проходити тести</h1>
            }
            
        </div>
    )
}
