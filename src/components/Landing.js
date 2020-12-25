import React, { useState, useEffect } from 'react';
import ReactWOW from 'react-wow';
import program from '../images/program.jpg';
import LoadPage from './LoadPage';
import '../styles/Landing.scss';

export default function Landing() {
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setLoaded(true)
        }, 4000)
    })

    if(loaded){
        return (
            <div className='landing'>
                <div className='Block0'>
                    <h1 className='logo'>Study Link</h1>
                    <br/><br/>
                    <h2>Курси програмування</h2>
                </div>
                <div className='kurs_info'>
                    <ReactWOW animation='bounceInLeft' duration="2s">
                        <div className='w-50 float_left bg1'>
                            <h2>Умови:</h2>
                            <ul type='square'>
                                <li> Для дітей 11-14 років.</li>
                                <li>Заняття у компютерних класах з проектором. </li>
                                <li>Заняття відбуваються один раз у тиждень.</li>
                                <li>Заняття триває - 1 годину 50 хвилин.</li>
                            </ul>
                        </div>
                    </ReactWOW>
                    <ReactWOW animation='bounceInRight' duration="2s">
                        <div className='w-50 float_left bg2'>
                            <h2>Навчимо: </h2>
                            <ul type='square'>
                                <li>Створювати web-сайти.</li>
                                <li>
                                    Мов: <a href="https://uk.wikipedia.org/wiki/HTML"><span className='html'>html</span></a>, <a href="https://uk.wikipedia.org/wiki/CSS"><span className='css'>css</span></a> та <a href="https://uk.wikipedia.org/wiki/JavaScript"><span className='js'>javascript</span></a>.
                                </li>
                                <li>Користуватись <a href="https://uk.wikipedia.org/wiki/Git"><span className='git'>git</span></a>.</li>
                                <li>Користуватись додатковами програмами та сайтами для створення web-сторінок</li>
                            </ul>
                        </div>
                    </ReactWOW>

                    <ReactWOW animation='jackInTheBox' duration="2s">
                        <div className='w-100 float_left bg3'>Перше заняття безкоштовно!</div>
                    </ReactWOW>

                    <ReactWOW animation='rotateInUpLeft' duration="1s">
                        <div className='w-100 float_left bg4'>
                            <h2>По закінченю курсу ви отримуєте:</h2>
                            <h3>Знання необхідні у будь-якій сфері web-розробки</h3>
                            <h3>Роботи збережені на відкритому ресурсі</h3>
                            <h3>Курсову роботу яку не соромно розмістити у резюме</h3>
                            <h3>Сертифікат у разі успішного завершення курсу</h3>
                        </div>
                    </ReactWOW>
                </div>

                <div className='include'>
                    <h2>Що включає курс?</h2>
                    <br/>
                    <div className='include_blocks'>
                        <div className='include_block'>
                            <i className="fas fa-laptop"></i>
                            <p>Інтерактивний особистий кабінет з доступом до відео та матеріалів курсу</p>
                        </div>

                        <div className='include_block'>
                            <i className="fas fa-hands-helping"></i>
                            <p>Постійні консультації і коментарі від викладача, навіть поза заняттями</p>
                        </div>
                        <div className='include_block'>
                            <i className="fas fa-chalkboard-teacher"></i>
                            <p>Контроль знань - практичні роботи і тести</p>
                        </div>
                        <div className='include_block'>
                            <i className="fas fa-check-double"></i>
                            <p>Кожна тема зкріплюється практичними завданнями</p>
                        </div>
                        <div className='include_block'>
                            <i className="fas fa-tools"></i>
                            <p>Знайомство з необхідними сучасними допоміжними інструментами та програмами для web-розробки</p>
                        </div>
                        <div className='include_block'>
                            <i className="far fa-window-restore"></i> 
                            <p>Кожен курс закінчується виконанням власного проекту</p>
                        </div>
                        
                    </div>
                </div>
                
                <h1 className='progamHeader'>Програма курсу "HTML/CSS"</h1><br/><br/>

                <img src={program} alt='program' width='60%' className='program'/>

                <div className="footer">
                    <div className="footer-left">StudyLink</div>
                    <div className="footer-center">Lviv 2020</div>
                    <div className="footer-right">kosaniakm@gmail.com</div>
                </div>
            </div>
        )
    } else{
        return (
            <LoadPage/>
        )
    }
}
