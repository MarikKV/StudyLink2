import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import '../../styles/Test.scss';

export default function Test(props) {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);
    const time_multilpier = 2;

    const [timeStart, setTimeStart] = useState(10);
    const [timeLeft, setTimeLeft, timeRef] = useState(10);
    const [line, setLine] = useState("100%");

    const [lineStyles, setLineStyles] = useState({
        "height": "10px",
        "background": "green"
    });

    const chuseAnswer = function(element, unsver){
        props.cleareAnswers();
        element.classList.add('selected-answer');
        props.submitUnsver(unsver);
    }

    useEffect(()=>{
        //cleareAnswers();
        if(props.test.time > 0)
        {
            setTimeLeft(props.test.time * time_multilpier);
            setTimeStart(props.test.time * time_multilpier);
            /*
            const updateLine = function(){
                setLine(line => {
                    let timeLeft;
                    setTimeLeft(currentState  => {
                        timeLeft = currentState  - 1;
                        if(timeLeft <=0 )clearInterval(timer)
                        return timeLeft;
                    });
                    if(timeLeft >= timeStart*(0.65)){
                        setLineStyles(style => { return { ...style, "background": "green"  } })
                    }
                    else if(timeLeft < timeStart*(0.65) && timeLeft > timeStart*0.35){
                        setLineStyles(style => { return { ...style, "background": "orange" } })
                    }
                    else if(timeLeft <= timeStart*(0.35) && timeStart >= 1 && timeLeft >= 1){
                        setLineStyles(style => { return { ...style, "background": "red"    } })
                    }
                    console.log(timeLeft);
                    console.log(timeStart)
                    return (100*timeLeft)/timeStart + "%";
                })
            } 
            let timer = setInterval(updateLine, 1000);
            return () => clearInterval(timer);
            */
        }
    }, [props])

    return (
        <div className="mt-5">
            {/*
            <h4>Часу залишилось: {timeLeft}</h4>
            <hr style={lineStyles} id="line" className="test_line" align="left" color="green" width={line} />
            */}
            <h4 className="text-left mt-5" dangerouslySetInnerHTML={{ __html: props.test.question }}></h4>
            <div className="my-5">
                {props.test.variants?.map( (unsver, idx) => (
                    <p key={idx} className="text-left p-2 unsver" onClick={e => chuseAnswer(e.target, unsver)}>{idx+1}. {unsver}</p>
                ))}
            </div>
        </div>
    )
}
