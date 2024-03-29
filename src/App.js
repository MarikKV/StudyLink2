import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Admin from './components/admin-edit/Admin';
import Landing from './components/Landing';
import Temes from './components/temes/Temes';
import AddTheme from './components/admin-edit/AddTheme';
import Online from './components/Online';
import HomeTeacher from './components/HomeTeacher';
import AddTeacher from './components/admin-edit/AddTeacher';
import AddTest from './components/admin-edit/AddTests';

function App() {
  return (
    <HashRouter basename='/'>
      <Route path='/' component={Menu}/>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/Temes' component={Temes}/>
      <Route exact path='/AddTheme' component={AddTheme}/>
      <Route exact path='/Online' component={Online}/>
      <Route exact path='/Home' component={Home}/>
      <Route exact path='/AddTest' component={AddTest}/>
      <Route exact path='/HomeTeacher' component={HomeTeacher}/>
      <Route exact path='/AddTeacher' component={AddTeacher}/>
      <Route exact path='/Admin' component={Admin}/>
      <Route exact path='/Login' component={Login}/>
    </HashRouter>
  );
}

export default App;
