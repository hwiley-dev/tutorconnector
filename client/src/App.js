import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/layout/Register'
import Landing from './components/layout/Landing'
import ProfileBrowser from './components/layout/ProfileBrowser'
import './App.css';

const App = () =>  ( 
<Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Switch>
        <Route exact path='/profiles/' component={ProfileBrowser} />
        <Route exact path='/register/' component={Register} />
        <Route exact path='/login/' component={Login} />
      </Switch> 
    </section>
  </Fragment>
</Router>
);
export default App;
