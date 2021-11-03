import React from 'react';
import '../styles/Home.scss';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function Home() {
    const isLogged = useSelector(state => state.isLogged);
    const user = useSelector(state => state.saveStudentInfo);

    console.log(user);
    
    if(!isLogged){ return <Redirect to='/login'/>}
    return (
        <div>
            {!isLogged 
                ? 
                <h1 align="center">Протрібно увійти</h1>
                :
                <>
                    <div className="container">
                        <h1 align='center' className="hi">Вітаю {user.name}!</h1>
                        <hr />
                        {user.kurs === '2' 
                            ? 
                            <h1 align='center' className="kurs">Вам доступні матеріали для курсу HTML/CSS та JavaScript</h1> 
                            :
                            <h3 align='center' className="kurs">Вам доступні матеріали для курсу HTML/CSS</h3> 
                        }
                        <hr />
                        <h3 align='center' className="help">
                            Якщо у вас виникли проблеми з користуванням сайтом зверніться до вчителя.
                        </h3>

                        <h3>Також ваші питання можна задати в групі у <span className="viber">viber</span>. Для зручності рекомендуємо встановити <span className="viber">viber</span> на коп'ютер за цим <a href="https://www.viber.com/ru/download/">посиланням</a>.</h3>

                        <div className="important">
                            <h2>Варто знати!</h2> 

                            <h3>Про оцінки та домашні завдання.</h3>
                            <p className="important_info">Робота учнів на занятті оцінються вчителем. Оцінки та іфнормація про оплати зберігається у електронному журналі. Переглянути оцінки можна на цьому сайті у вкладці - "Журнал" або на сайті google sheets. Доступ до журналу також можна отримати в групі у viber.</p>

                            <p className="important_info">Учень отримує оцінку тільки у випадку повного виконання завдання. Найвищі оцінки отримують учні які виконали завання першими ( далі за спаданням ).</p>
                            
                            <p className="important_info">Завдання які не було зроблено на занятті залишаються учневі на домашнє опрацювання. Питання по домашньому завданні можна задавати в групі у viber.</p>

                            <h3>Якщо пропутив/пропутила заняття?</h3>
                            <p className="important_info">Якщо ви пропустили заняття його можна відпрацювати за можливості на занятті в іншій групі ( деталі узгоджувати у вчителя ). Також учням надається доступ до відео-уроків де розбирається нова тема та виконання завдань. Рекомендуємо переглядати відео-уроки пред заняттями для повторення.</p>

                            <p className="important_info">Якщо відпрацювати заняття немає можливості тема залишається на домашнє опрацювання. Завдання можна виконати по відео-урокам, а питання можна писати в групі у viber.</p>

                            <h3>Про GitHub</h3>
                            <p className="important_info">На заняттях учні кориcтуватимуться web-сервісом для розробки програмного забеспечення <a href="https://github.com/" className="github">GitHub</a>. Обов'яково створіть собі <a href="https://accounts.google.com/signup/v2/webcreateaccount?hl=ua&flowName=GlifWebSignIn&flowEntry=SignUp">електорну пошту</a>, або використайте вже існуючу для того, щоб зареєструвати свій акаунт у GitHub на занятті або вдома.</p>
                            
                            <p className="important_info">Якщо ви вже маєте акаунт у GitHub але забули свій пароль, не забувайте, його можна відновити. Просто натисніть на посилання "Forgot password?" або "Забули пароль?" на сторінці "Sign in" або "Увійти". Вам на пошту прийде повідомлення з інформацією для відновлення паролю.</p>

                            <p className="important_info">Усі виконані учнем завдання зберігаються на його акаунті GitHub. Тому за прогресом учня можна слідкувати онлайн у будь-який момент часу.</p>
                        </div>
                    </div>
                </>
            
            }
        </div>
    )
}
