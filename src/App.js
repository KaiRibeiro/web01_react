import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/store'

// Paginas
import Login from './view/login';
import NewUser from './view/newUser';
import Dashboard from './view/dashboard';
import Contato from './view/contato';
import Hosts from './view/hosts';
import HostDetalhes from './view/hostDetalhes';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/cadastro' component={NewUser}/>
        <Route exact path='/contato' component={Contato}/>
        <Route exact path='/hosts' component={Hosts}/>
        <Route path='/hosts/:parametro' component={Hosts}/>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/hostdetalhes/:idHost' component={HostDetalhes}/>

      </Router>
    </Provider>
  );
}

export default App;
