import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import { getFirestore, collection, where, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import TemesForKurs from './TemesForKurs';

export default function Temes() {

    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);
    const status = useSelector(state => state.status);

    const [temes, setTemes] = useState([]);
    const [temesJS, setTemesJS] = useState([]);
    const [temesJS2, setTemesJS2] = useState([]);

    useEffect(() => {
        const fetchTemes = async (collectionName, passField) => {
          try {
            const temesSnapshot = await getDocs(collection(db, collectionName));
            const allTemes = temesSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            allTemes.sort((a, b) => a.id - b.id);
    
            const passedTemes = allTemes.slice(0, user[passField]);
            return passedTemes;
          } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            return [];
          }
        };
    
        const fetchData = async () => {
          if (status === 'Student') {
            try {
              const groupsSnapshot = await getDocs(collection(db, 'Groups'));
              const groupData = groupsSnapshot.docs
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
                .find((group) => group.name === user.group);
    
              const newTemes = await fetchTemes('Temes', 'temes_pass');
              const newTemesJS = await fetchTemes('Temes2', 'temes2_pass');
              const newTemesJS2 = await fetchTemes('Temes3', 'temes3_pass');
    
              setTemes(newTemes);
              setTemesJS(newTemesJS);
              setTemesJS2(newTemesJS2);
            } catch (error) {
              console.error('Error fetching data for student:', error);
            }
          } else if (status === 'Teacher' || status === 'Admin') {
            const allTemes = await fetchTemes('Temes', 'temes_pass');
            const allTemesJS = await fetchTemes('Temes2', 'temes2_pass');
            const allTemesJS2 = await fetchTemes('Temes3', 'temes3_pass');
    
            setTemes(allTemes);
            setTemesJS(allTemesJS);
            setTemesJS2(allTemesJS2);
          }
        };
    
        fetchData();
      }, [status, user.group, user.kurs]);

    return (
        <div>
            {isLogged ? 
            <>
                <h1 align='center'>Теми відкриті для {user.name} </h1>
                <div style={{width: '80%', marginLeft: '10%'}}>
                <Tabs defaultActiveKey="HTML/CSS" id="uncontrolled-tab-example">
                    <Tab eventKey="HTML/CSS" title="HTML/CSS">
                        <TemesForKurs temes={temes} prefix="html-css"/>
                    </Tab>
                    <Tab eventKey="JavaScript" title="JavaScript">
                        {user.kurs >= '2' || status === 'Teacher' || status === 'Admin'
                            ? 
                            <TemesForKurs temes={temesJS} prefix="/js"/>
                            :
                            <h1 align='center'>Цей курс для Вас не відкритий</h1>}
                    </Tab>
                    <Tab eventKey="JavaScript2" title="JavaScript (v2)">
                        {user.kurs >= '3' || status === 'Teacher' || status === 'Admin'
                            ? 
                            <TemesForKurs temes={temesJS2} prefix="/js_2"/>
                            :
                            <h1 align='center'>Цей курс для Вас не відкритий</h1>}
                    </Tab>
                </Tabs>
                <br/><br/><br/>
                <h5>Доступ до тем відкривається поступово. Виконані завдання зберігайте на своєму акаунті GitHub.
                    Якщо у вас проблеми з досупом до тем або ви помітите якусь помилку на сайті прохання сказати про це вчителю.
                </h5>
                <br/><br/><br/>
                </div>
            </>
            :
            <h1 align="center">Увійдіть щоб побачити теми</h1>
            }
        </div>
    )
}
