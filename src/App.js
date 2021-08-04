import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


// Paginas
import Login from './view/login';
import NewUser from './view/newUser';
import Dashboard from './view/dashboard';


function App() {
  return (
    <Router>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/cadastro' component={NewUser}/>
      <Route exact path='/' component={Dashboard}/>
    </Router>
  );
}

export default App;
