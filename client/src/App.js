import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register';
import Nav from './components/Nav';
import GDPR from './components/GDPR';

function App() {
  return (
    <HashRouter basename = "/">
      <Switch>
        {/* <Route exact path={"/"} component={() => <h1>Index</h1>}/> */}
        <Route path = {'/dashboard'}>
          <Nav/>
          <GDPR/>
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