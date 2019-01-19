import React, { Component } from 'react';

import Navitems from './components/Navitems';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { Redirect } from 'react-router';

import Login from './components/Login';
import Home from './components/Home';
import Friendframe from './components/Friendframe';

import Search from './components/Search';

import Signup from './modals/Signup';
import Delete from './modals/Delete';

import base from './base';
import './App.css';

class App extends Component {

    constructor() {
      super();
      this.authHandler = this.authHandler.bind(this);
      this.logout = this.logout.bind(this);
      this.state = {
        user: {},
        name: null,
        email: null,
        user_id: null
      }
    }    

    authHandler(err, authData) {
      
      if (err && err.message) { 
        console.log(err);              
        document.getElementById("message").innerHTML = err.message;
        document.getElementById("error").style.display = "block";
        return;
      }
      if(authData.user) {
        
        console.log("User logged in:", authData.user);
        //Facebook provides user's name or just use email?
        authData.user.displayName ? this.setState( {name: authData.user.displayName}) 
            : this.setState({ name: authData.user.email.split("@")[0]});
        
        this.setState( {email: authData.user.email});
        
        //account retrieval/mapping info to app
        base.fetch(`users/${this.state.user_id}`, {
          context: this
        }).then(() => {
            base.database().ref(`users/${this.state.user_id}/profile`)
            .set({ name: this.state.name, email: this.state.email })
        });
        
      }    
    }

    
    logout() {
      base.unauth();
      this.setState( {user: {}, email: null, user_id: null, name:null });
    }

    componentDidMount() {
      
      //Listens for authentication
      base.onAuth((user) => {
        this.setState( {user: {}, email: null, user_id: null, name:null });
        
        this.authHandler(null, { user })
        //Sync with User data if authed
        if(user) { 
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
      console.log("Userid is:",this.state.user_id);
      
      return (
        <Router>

          <div className="App">
        
            <Navitems name={this.state.name} logout={this.logout}/>
            <Switch>
              <Route path='/' render= { () =>  this.state.name ? <Redirect to="/home"/> : <Login name={this.state.name} authHandler={this.authHandler}/>  } exact />
              <Route path='/home' render= { () => <Home user={this.state.user} name={this.state.name} user_id={this.state.user_id}/> } exact />
              <Route path='/friends' render={ () => <Friendframe user={this.state.user} name={this.state.name} user_id={this.state.user_id} email={this.state.email} />} exact />
              <Route path='/search' render={ () => <Search user={this.state.user} user_id={this.state.user_id}/>} exact/>
            </Switch>
            
            <Signup authHandler={this.authHandler}/>
            <Delete user_id={this.state.user_id}/>
            
          </div>
        </Router>

      );
    }
  
    componentWillUmount() {
      base.removeBinding(this.ref)
    }
  }

export default App;
