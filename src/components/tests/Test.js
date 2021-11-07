import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import '../../styles/Test.scss';

export default function Test(props) {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [line, setLine] = useState("100%");

    const [lineStyles, setLineStyles] = useState({
        "height": "10px",
        "background": "green"
    });

    useEffect(()=>{
        if(props.test.time != null){

            let start = props.test.time;
            let left = props.timeLeft;
            setLine(line => {
               
                if(left < start*(0.65) && left > start*0.35){
                    setLineStyles(style => { 
                        return {
                            ...style,
                            "background": "orange" 
                        }
                    })
                }
                
                else if(left <= start*(0.35) && start>=1 && left >=1){
                    setLineStyles(style => { 
                        return {
                            ...style,
                            "background": "red" 
                        }
                    })
                }
                
                let newLineVal = (100*left)/start;
                
                if(newLineVal < start/100) {
                    document.getElementById('line').classList.remove('test_line');
                    setLineStyles(style => { 
                        return {
                            ...style,
                            "background": "green" 
                        }
                    })
                    setTimeout( ()=>{document.getElementById('line').classList.add('test_line')}, 1000 )
                    return "100%"; 
                }
                return newLineVal + "%"
            } )
        }
    },[status, props])

    return (
        
        <div className="mt-5">
            <h4>Часу залишилось: {props.timeLeft}</h4>
            <hr style={lineStyles} id="line" className="test_line" align="left" color="green" width={line} />
            
            <h2 className="text-left mt-5">{props.test.question}</h2>
           
            <div className="my-5">
                {props.test.variants?.map( (unsver, idx) => (
                    <p key={idx} className="text-left p-2 unsver">{idx+1}. {unsver}</p>
                ))}
            </div>
        </div>
        
    )
}
