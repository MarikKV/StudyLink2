import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function Home() {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const state = useSelector(state => state)

    if(!isLogged){ return <Redirect to='/login'/>}
    return (
        <div>
            {console.log(state)}
            {isLogged 
                ? 
                <>
                    <h1 align='center'>Вітаю {user.name}!
                        <br/><br/>
                    </h1> 

                </>
                : 
                <h1>not logged</h1>
            }
        </div>
    )
}
