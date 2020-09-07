import React from 'react';
import '../styles/Home.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function Home() {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);

    if(!isLogged){ return <Redirect to='/login'/>}
    return (
        <div>
            {isLogged 
                ? 
                <>
                    <h1 align='center' className="hi">Вітаю {user.name}!</h1>
                    
                    {user.kurs === '2' 
                        ? 
                        <h1 align='center' className="kurs">Вам доступні матеріали для курсу HTML/CSS та JavaScript</h1> 
                        :
                        <h3 align='center' className="kurs">Вам доступні матеріали для курсу HTML/CSS</h3> 
                    }
                    <h3 align='center' className="help">
                        Якщо у вас виникли проблеми з користуванням сайтом зверніться до вчителя.
                    </h3>
                </>
                : 
                <h1>not logged</h1>
            }
        </div>
    )
}
