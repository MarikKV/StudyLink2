import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { firebase } from '../firebase';
import { login, saveUserInStore, adminLogin, userStatus, saveStudentInfoInStore } from '../actions'

export default function Menu() {
    const logged = useSelector(state => state.isLogged);
    const status = useSelector(state => state.status);
    const user = useSelector(state => state.saveUserInStore);
    const admin = useSelector(state => state.admin);

    const [statusLinks, setStatusLinks] = useState(null)

    const dispatch = useDispatch()

    const logOut = () => {
        firebase.auth().signOut(); 
        dispatch(login(false))
        dispatch(saveUserInStore({}))
        dispatch(saveStudentInfoInStore({}))
        dispatch(adminLogin(false))
        dispatch(userStatus('Guest'))
    }

    useEffect(()=>{
        if(status === 'Guest'){
            setStatusLinks(
                <Nav.Link href="/UserStatus">Підтвердити статус</Nav.Link>
            )
        }
        if(status === 'Student'){
            setStatusLinks(
                <>
                    <Nav.Link href="/Temes">Теми</Nav.Link>
                    <Nav.Link href="/Online">Навчання онлайн</Nav.Link>
                </>
            )
        }
        if(status === 'Teacher'){
            setStatusLinks(
                <>
                <Nav.Link href="/Temes">Теми</Nav.Link>
                <Nav.Link href="/HomeTeacher">Мої групи</Nav.Link>
                <Nav.Link href="/TeacherGroups">Додати/Видалити учня</Nav.Link>
                </>
            )
       }
       if(status === 'Admin'){
        setStatusLinks(
            <>
                <Nav.Link href="/Temes">Теми</Nav.Link>
                <Nav.Link href="/Admin">Додати школу/групу/учня</Nav.Link>
                <Nav.Link href="/AddTheme">Додати тему</Nav.Link>
            </>
        )
   }
    },[status])
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
            <Navbar.Brand href="/">StudyLink</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {logged 
                        ? 
                        <>
                            <Nav.Link href="/Home">Головна</Nav.Link>
                            {statusLinks}
                        </>
                        :
                        null
                    }
                    </Nav>
                    
                    {logged 
                        ? 
                        <Nav>
                            <Nav.Link>
                                <img 
                                    alt='user' 
                                    src={user.photoUrl} 
                                    align='center' 
                                    width='30px' 
                                    height='30px'/> {user.name} {admin ? <b>admin</b> : null} 
                            </Nav.Link>
                            <Nav.Link onClick={logOut}>Вийти</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href="/Login">Увійти</Nav.Link>
                        </Nav>
                    }
                    
                </Navbar.Collapse>
            </Navbar>
    )
}
