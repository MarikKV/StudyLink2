import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import '../../styles/Test.scss';

export default function Test(props) {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);
    const time_multilpier = 2;

    const [line, setLine] = useState("100%");

    const [lineStyles, setLineStyles] = useState({
        "height": "10px",
        "background": "green"
    });

    const chuseAnswer = function(element, unsver){
        cleareAnswers();
        element.classList.add('selected-answer');
        console.log(unsver)
    }

    const cleareAnswers = function(){
        document.querySelectorAll('.unsver').forEach(e=>e.classList.remove('selected-answer'));
        console.log('clear')
    }

    useEffect(()=>{
        if(props.test.time != null){

            let start = props.test.time*time_multilpier;
            let left = props.timeLeft;
            setLine(line => {
               
                if(left >= start*(0.65)){
                    setLineStyles(style => { return { ...style, "background": "green"  } })
                }
                else if(left < start*(0.65) && left > start*0.35){
                    setLineStyles(style => { return { ...style, "background": "orange" } })
                }
                else if(left <= start*(0.35) && start>=1 && left >=1){
                    setLineStyles(style => { return { ...style, "background": "red"    } })
                }
                
                return (100*left)/start + "%";
            } )
        }
    }, [status, props])

    return (
        <div className="mt-5">
            { props.timeLeft == 1 ? cleareAnswers() : null }
            <h4>Часу залишилось: {props.timeLeft}</h4>
            <hr style={lineStyles} id="line" className="test_line" align="left" color="green" width={line} />
            
            <h2 className="text-left mt-5">{props.test.question}</h2>
           
            <div className="my-5">
                {props.test.variants?.map( (unsver, idx) => (
                    <p key={idx} className="text-left p-2 unsver" onClick={e => chuseAnswer(e.target, unsver)}>{idx+1}. {unsver}</p>
                ))}
            </div>
        </div>
    )
}
