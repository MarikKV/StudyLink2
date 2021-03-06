import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Admin from './components/Admin';
import Landing from './components/Landing';
import Temes from './components/Temes';
import AddTheme from './components/AddTheme';
import Online from './components/Online';
import HomeTeacher from './components/HomeTeacher';
import AddTeacher from './components/AddTeacher';
import Journal from './components/Journal';
import Tests from './components/Tests';
import AddTest from './components/AddTest';

function App() {
  return (
    <HashRouter basename='/'>
      <Route path='/' component={Menu}/>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/Temes' component={Temes}/>
      <Route exact path='/AddTheme' component={AddTheme}/>
      <Route exact path='/Online' component={Online}/>
      <Route exact path='/Home' component={Home}/>
      <Route exact path='/Journal' component={Journal}/>
      <Route exact path='/Tests' component={Tests}/>
      <Route exact path='/AddTest' component={AddTest}/>
      <Route exact path='/HomeTeacher' component={HomeTeacher}/>
      <Route exact path='/AddTeacher' component={AddTeacher}/>
      <Route exact path='/Admin' component={Admin}/>
      <Route exact path='/Login' component={Login}/>
    </HashRouter>
  );
}

export default App;
