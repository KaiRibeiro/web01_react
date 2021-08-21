import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from '../src/store'
import { PersistGate } from 'redux-persist/integration/react';

// Paginas
import Login from './view/login';
import NewUser from './view/newUser';
import Dashboard from './view/dashboard';
import Contato from './view/contato';
import Hosts from './view/hosts';
import HostDetalhes from './view/hostDetalhes';
import Relatorios from './view/relatorios';
import RelatorioDetalhes from './view/relatorioDetalhes';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/cadastro' component={NewUser}/>
          <Route exact path='/contato' component={Contato}/>
          <Route exact path='/hosts' component={Hosts}/>
          <Route path='/hosts/:parametro' component={Hosts}/>
          <Route path='/hostdetalhes/:idHost' component={HostDetalhes}/>
          <Route exact path='/relatorios' component={Relatorios}/>
          <Route path='/relatorios/:parametro' component={Relatorios}/>
          <Route path='/relatoriodetalhes/:idRelatorio' component={RelatorioDetalhes}/>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
