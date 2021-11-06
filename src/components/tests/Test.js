import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import '../../styles/Test.scss';

export default function Test(props) {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [line, setLine] = useState("100%");
    const [left, setLeft] = useState(0);

    const [lineStyles, setLineStyles] = useState({
        "height": "10px",
        "background": "green"
    });

    useEffect(()=>{
        if(props.test.time != null){
            setLeft(props.test.time)
            let start = props.test.time;
            let left = props.test.time;
            let period = 100/start;
  
            const timer = setInterval(()=>{
                left--;
                setLeft(left => left - 1)
                if(left <= 0){
                    console.log("Time out!");
                    clearInterval(timer)
                }
                setLine(line => {
                    if(left < start*(0.65) && left > start*0.35){
                        setLineStyles(style => { 
                            return {
                                ...style,
                                "background": "orange" 
                            }
                        })
                    }else if(left <= start*(0.35)){
                        setLineStyles(style => { 
                            return {
                                ...style,
                                "background": "red" 
                            }
                        })
                    }
                    let newLineVal = Number(line.replace("%","") - period);
                    if(newLineVal <= 1) {
                        document.getElementById('line').classList.remove('test_line');
                        setLineStyles(style => { 
                            return {
                                ...style,
                                "background": "green" 
                            }
                        })
                        setTimeout( ()=>{document.getElementById('line').classList.add('test_line')}, 500)
                        return "100%"; 
                    }
                    return Number(line.replace("%","") - period) + "%"
                } )
            }, 1000)

            return () => clearInterval(timer);
        }
    },[status, props])

    return (
        
        <div className="mt-5">
            <h4>Часу залишилось: {left}</h4>
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
