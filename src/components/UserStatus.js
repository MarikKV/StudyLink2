import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFirestore, collection, where, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { adminLogin, saveStudentInfoInStore, userStatus, login } from '../actions';
import '../styles/SignInToGroup.scss';


export default function UserStatus() {
    const admin = useSelector(state => state.admin);
    const myStatus = useSelector(state => state.status);

    const [status, setStatus] = useState('Мій статус');
    const [school, setSchool] = useState('');
    const [group, setGroup] = useState('');
    const [schools, setSchools] = useState([]);
    const [groups, setGroups] = useState([]);
    const [adminPassword, setAdminPassword] = useState('');
    const [schoolPassword, setSchoolPassword] = useState('');
    const [groupPassword, setGroupPassword] = useState('');
    const [errorPass, setErrorPass] = useState(false);

    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === 'Адміністратор') {
          console.log(process.env.REACT_APP_ADMIN_PASS);
          if (adminPassword === process.env.REACT_APP_ADMIN_PASS) {
            dispatch(login(true));
            dispatch(adminLogin(true));
            dispatch(userStatus('Admin'));
            setAdminPassword('');
          } else {
            setErrorPass(true);
            setTimeout(() => setErrorPass(false), 3000);
          }
        }
        if (status === 'Учень') {
          console.log('учень', school, group, groupPassword);
          let passed = false;
          const studentsQuery = query(collection(db, 'Students'), where('group', '==', group));
          try {
            const snapshot = await getDocs(studentsQuery);
            snapshot.forEach((document) => {
              const user = { id: doc.id, ...document.data() };
              if (user.password === groupPassword) {
                console.log(user.id);
                updateDoc(doc(db, 'Students', user.id), {
                  lastLogin: Date.now(),
                });
                dispatch(login(true));
                dispatch(saveStudentInfoInStore({ status, ...user }));
                dispatch(userStatus('Student'));
                passed = true;
              }
            });
            if (!passed) {
              setErrorPass(true);
              setTimeout(() => {
                setErrorPass(false);
                console.log('hide');
              }, 3000);
            }
          } catch (err) {
            console.log(err);
          }
        }
        if (status === 'Вчитель') {
          const teachersQuery = query(collection(db, 'Teachers'), where('school', '==', school));
          try {
            const snapshot = await getDocs(teachersQuery);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            if (data[0].password === schoolPassword) {
              dispatch(login(true));
              dispatch(saveStudentInfoInStore({ status, ...data[0] }));
              dispatch(userStatus('Teacher'));
            } else {
              setErrorPass(true);
              setTimeout(() => {
                setErrorPass(false);
                console.log('hide');
              }, 3000);
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
    //fields components
    let [ schoolField, groupChuse, loginAndPass, adminPassCheck ] = [null, null, null, null];
    if(status === 'Учень'){
        schoolField = (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={e => setSchool(e.target.value)}>
                    <option>Мій заклад</option>
                    {
                        schools.map((item,idx) => 
                            <option key={idx}>{item.name}</option>
                        )
                    }
                </Form.Control>
            </Form.Group>
        )
        if(school){
            groupChuse = (
                <>
                <Form.Group>
                    <Form.Control as="select" onChange={e => setGroup(e.target.value)}>
                        <option>Моя група</option>
                        {
                            groups.map((item,idx) => 
                                <option key={idx}>{item.name}</option>
                            )
                        }
                    </Form.Control>
                </Form.Group>
                { group 
                    ? <>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                placeholder="School for password" 
                                value={groupPassword}
                                onChange={e => setGroupPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Увійти
                        </Button> 
                    </>
                    : null
                }
                </>
            )
            
        }
        
    }
    if(status === 'Вчитель'){
        schoolField = (
            <>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" onChange={e => setSchool(e.target.value)}>
                    <option>Мій заклад</option>
                    {
                        schools.map((item,idx) => 
                            <option key={idx}>{item.name}</option>
                        )
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control 
                    name="password" 
                    type="password" 
                    placeholder="School for password" 
                    value={schoolPassword}
                    onChange={e => setSchoolPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Увійти
            </Button>
            </>
        )
    }
    if(status === 'Адміністратор'){
        adminPassCheck = (
            <>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password for call center</Form.Label>
                    <Form.Control 
                        name="password" 
                        type="password" 
                        placeholder="Admin password" 
                        value={adminPassword}
                        onChange={e => setAdminPassword(e.target.value)}
                    />
                </Form.Group>
            
                <Button variant="primary" type="submit">
                    Увійти
                </Button>
            </>
        )
    }
    useEffect(() => {
        const fetchSchools = async () => {
          try {
            const schoolsSnapshot = await getDocs(collection(db, 'Schools'));
            const allSchools = schoolsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSchools(allSchools);
          } catch (err) {
            console.error('Error fetching schools:', err);
          }
        };
      
        const fetchGroups = async () => {
          if (school) {
            try {
              const groupsQuery = query(collection(db, 'Groups'), where('school', '==', school));
              const groupsSnapshot = await getDocs(groupsQuery);
              const allGroups = groupsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setGroups(allGroups);
            } catch (err) {
              console.error('Error fetching groups:', err);
            }
          }
        };
      
        fetchSchools();
        fetchGroups();
      }, [admin, school]);
    if(myStatus !== 'Guest') return <Redirect to='#/home'/>
    return (
        <div className='form'>
            <h1 align='center'>Підтвердіть свій статус щоб продовжити</h1>
            <Form onSubmit={onSubmit}>
                { 
                    errorPass 
                        ?  
                        <Alert variant="danger">
                           Невірний пароль!
                        </Alert> 
                        : ''
                }
                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Control as="select" onChange={e => setStatus(e.target.value)}>
                            <option>Мій статус</option>
                            <option>Учень</option>
                            <option>Вчитель</option>
                            <option>Адміністратор</option>
                    </Form.Control>
                </Form.Group>
                
                {/*компонент для вибору закладу (школи)*/}
                {schoolField}

                {/*компонент для вибору групи у даному закладі (школі)*/}
                {groupChuse}

                {/*Admin перевірка паролю*/}
                {adminPassCheck}

                {/*логін і пароль відносно вибраного статусу*/}
                {loginAndPass}
            </Form>
        </div>
    )
}
