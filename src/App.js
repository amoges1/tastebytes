import React, { Component } from 'react';

import Navitems from './components/Navitems';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Friendframe from './components/Friendframe';

import Search from './components/Search';

import Signup from './modals/Signup';
import Map from './modals/Map';
import Delete from './modals/Delete';

import base from './base';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      user: {},
      name: null,
      email: null,
      user_id: null
    }
  }

  //facebook
  authenticate(provider) {
    console.log(`1. Trying ${provider}...`);
    base.authWithOAuthPopup(provider, this.authHandler); //returns as err,authdata callback
  }

  authHandler(err, authData) {
    console.log("2. authHandler");
    console.log(authData);
    
    if (err) { console.log(err); return }
    if(authData) {
      authData.user.displayName 
        ? this.setState( {name: authData.user.displayName}) 
        : this.setState({ name: authData.user.email.split("@")[0]});
      // this.setState( {name: authData.user.displayName});
      this.setState( {email: authData.user.email});
     
    }    
  }

  signup(e) {
    e.preventDefault();
    console.log(this.email.value);
    console.log(this.password.value);
    
    
    base.createUser({
      email: this.email.value,
      password: this.password.value
    }, this.authHandler);
  }

  logout() {
    base.unauth();
    console.log("Logged out");
    this.setState( {user: {}, email: null, user_id: null, name:null });
  }

  componentDidMount() {
    console.log("3. onAuth");
    
    base.onAuth((user) => {
     
      this.authHandler(null, { user })
      if(user) { 
        console.log("Mounting   ", user.user_id);
        
        this.setState({user_id: user.uid}  ); 
        this.ref = base.syncState(`users/${this.state.user_id}`, {
          context: this,
          state: 'user',
          isNullable: true
        })
      }
    })
  }
  
 

  render() {
    
    return (
      <Router>

        <div className="App">
      
          <Navitems name={this.state.name} logout={this.logout}/>
          <Switch>
            <Route path='/' render= { () =>  <Login authenticate={this.authenticate} logout={this.logout} signup={this.signup} /> } exact />
            <Route path='/home' render= { () => <Home user={this.state.user} name={this.state.name} /> } exact />
            <Route path='/friends' render={ () => <Friendframe user={this.state.user} name={this.state.name} user_id={this.state.user_id} email={this.state.email} />} exact />
            <Route path='/search' render={ () => <Search user={this.state.user} user_id={this.state.user_id}/>} exact/>
          </Switch>
          
          
          <Map/>

          <Delete/>
          <Signup/>
          <Delete/>
          
        </div>
      </Router>

    );
  }
 
  componentWillUmount() {
    base.removeBinding(this.ref)
  }
}

export default App;
