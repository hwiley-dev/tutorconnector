import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/layout/Register'
import Landing from './components/layout/Landing'
import ProfileBrowser from './components/layout/ProfileBrowser'
// Redux Provider
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () =>  ( 
<Provider store={store} >  
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
</Provider>
);
export default App;
