import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { firebase } from '../firebase';
import { getAuth, signOut } from 'firebase/auth'; 
import { login, saveUserInStore, adminLogin, userStatus, saveStudentInfoInStore } from '../actions'

export default function Menu() {
    const logged = useSelector(state => state.isLogged);
    const status = useSelector(state => state.status);
    const user = useSelector(state => state.saveStudentInfo);
    const admin = useSelector(state => state.admin);

    const [statusLinks, setStatusLinks] = useState(null)

    const dispatch = useDispatch()

    const logOut = async () => {
        const auth = getAuth(firebase); // Get the auth instance
    
        try {
          await signOut(auth); // Use the signOut function from the auth instance
          dispatch(login(false));
          dispatch(saveUserInStore({}));
          dispatch(saveStudentInfoInStore({}));
          dispatch(adminLogin(false));
          dispatch(userStatus('Guest'));
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };

    useEffect(()=>{
        if(status === 'Guest'){
            setStatusLinks(
                <Nav.Link href="#/UserStatus">Підтвердити статус</Nav.Link>
            )
        }
        if(status === 'Student'){
            setStatusLinks(
                <>
                    <Nav.Link href="#/Temes"><i className="fas fa-book"></i> Теми</Nav.Link>
                    <Nav.Link href="#/Online"><i className="fas fa-laptop-house"></i> Навчання онлайн</Nav.Link>
                </>
            )
        }
        if(status === 'Teacher'){
            setStatusLinks(
                <>
                <Nav.Link href="#/Temes"><i className="fas fa-book"></i> Теми</Nav.Link>
                <Nav.Link href="#/HomeTeacher"><i className="fas fa-users"></i> Мої групи</Nav.Link>
                <Nav.Link href="#/AddTeacher"><i className="fas fa-plus-circle"></i> Додати/Видалити учня</Nav.Link>
                <Nav.Link href="#/Online"><i className="fas fa-laptop-house"></i> Навчання онлайн</Nav.Link>
                </>
            )
       }
       if(status === 'Admin'){
        setStatusLinks(
            <>
                <Nav.Link href="#/Temes"><i className="fas fa-book"></i> Теми</Nav.Link>
                <Nav.Link href="#/Admin"><i className="fas fa-plus-circle"></i> Додати школу/групу/учня</Nav.Link>
                <Nav.Link href="#/AddTheme"><i className="fas fa-newspaper"></i> Додати тему</Nav.Link>
                <Nav.Link href="#/Online"><i className="fas fa-laptop-house"></i> Навчання онлайн</Nav.Link>
            </>
        )
   }
    },[status])
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
            <Navbar.Brand href="#/">StudyLink</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {logged 
                        ? 
                        <>
                            <Nav.Link href="#/Home"><i className="fas fa-home"></i> Головна</Nav.Link>
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
                               <i className="far fa-user"></i> {user.name} &nbsp;&nbsp; {admin ? <b>admin</b> : null} 
                            </Nav.Link>
                            <Nav.Link onClick={logOut}><i className="fas fa-sign-out-alt"></i> Вийти</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href="#/Login"><i className="fas fa-sign-in-alt"></i> Увійти</Nav.Link>
                        </Nav>
                    }
                    
                </Navbar.Collapse>
            </Navbar>
    )
}
