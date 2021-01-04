import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './components/login'
import Signin from './components/signin'
import Chat from './components/chat'


function App() {
  
  


  return (
    <div >
      <Router>
        <Route path='/' exact component={Login}></Route>
        <Route path='/signin' exact component={Signin}></Route>
        <Route path='/chat' exact component={Chat}></Route>
      </Router>
      
    </div>
  );
}

export default App;
