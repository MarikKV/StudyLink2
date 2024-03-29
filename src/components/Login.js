import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../styles/Login.scss';
import UserStatus from './UserStatus';




export default function Login() {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);

    if(isLogged){return <Redirect to='Home'/>}

   
    return (
        <div>
            {!isLogged ? 
                <UserStatus />
                : 
                <h1 align="center">You already logged as {user.name} {user.lastname}</h1>}
        </div>
    )
}