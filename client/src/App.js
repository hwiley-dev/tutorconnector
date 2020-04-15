import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Landing from './components/layout/Landing'
import ProfileBrowser from './components/layout/ProfileBrowser'
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
// Redux Provider
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // Must enter empty array in second parameter, otherwise useEffect() continues to run [only want to run once]
  return ( 
    <Provider store={store}>  
<Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={Landing} />
    <section className="container">
    <Alert />
      <Switch>
        {/* <Route exact path='/profiles/' component={ProfileBrowser} /> */}
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch> 
    </section>
  </Fragment>
</Router>
</Provider>
)};

export default App;
