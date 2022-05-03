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
    const [testActive, setTestActive] = useState(0);
    const [userUnsvers, setUserUnsvers] = useState([]);
    const [testStats, setTestStats] = useState({});

    const getTests = async function(){
        let tests = [];
        (await db.collection("Tests").get()).forEach(test => tests.push({id: test.id, ...test.data()}))
        setTests(tests);
        setTestActive(0);
        setTest(tests[0]);
    }

    const loadNextTest = function(){
        let newTestN = testActive + 1;
        if(newTestN >= tests.length) {
            if(newTestN <= tests.length) setTestActive(newTestN);
            countPoints();
            return
        };
        
        setTestActive(newTestN);
        setTest(tests[newTestN]);
        cleareAnswers();
    }

    const submitUnsver = function(unsver){
        let newUserUnsver = tests[testActive];
        newUserUnsver.userUnsver = unsver;
        newUserUnsver.unsverRight == newUserUnsver.userUnsver ? newUserUnsver.points = 1 : newUserUnsver.points = 0;
        setUserUnsvers(unsver => { 
            if(unsver.filter(t => t.id == newUserUnsver.id)?.length == 0){
                return [...unsver, newUserUnsver];
            }else{
                return [...unsver.filter(t => t.id != newUserUnsver.id), newUserUnsver];
            }
        });
        console.log(userUnsvers);
    }

    const countPoints = function(){
        let totalPoints = 0;
        let unsversRight = 0;
        let unsversFalse = 0;
        userUnsvers.forEach(u => {
            totalPoints += u.points; 
            u.points > 0 ? unsversRight++ : unsversFalse++; 
        })
        setTestStats(stats => {return { totalPoints, unsversRight, unsversFalse }})
    }

    const cleareAnswers = function(){
        document.querySelectorAll('.unsver').forEach(e=>e.classList.remove('selected-answer'));
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
                {
                    testActive == tests.length && tests.length != 0 ? 
                    <div className='mt-5'>
                        <h1>Тест завершено!</h1> 
                        <div>
                            <p className='text-left'>Набрано балів: {testStats.totalPoints}</p>
                            <p className='text-left'>Правильних відповідей: {testStats.unsversRight}</p>
                            <p className='text-left'>Невірних відповідей: {testStats.unsversFalse}</p>
                        </div>
                    </div>
                    :
                    <div>
                        <Test test={test} submitUnsver={submitUnsver} cleareAnswers={cleareAnswers}/>
                        <div align="right">
                            <button className="btn btn-primary" onClick={loadNextTest}>Наступний</button>
                        </div>
                    </div>
                }
            </>
            :
            <h1 className="text-center mt-3">Увійдіть щоб проходити тести</h1>
            }
            
        </div>
    )
}
