import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register';
import Nav from './components/Nav';
import GDPR from './components/GDPR';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <HashRouter basename = "/">
      <Switch>
        <Route path = {'/dashboard'}>
          <Nav/>
          <GDPR/>
          <Dashboard/>
        </Route>
        
        <Route exact path = {"/"} component={Login} />
        <Route exact path = {"/register"} component={Register} />
      </Switch>
    </HashRouter>
  );
}
{/* <div className="App">
      <header className="App-header">

      </header>
    </div> */}
export default App;