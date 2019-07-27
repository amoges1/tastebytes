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
    super(); //calls parent component
    //manual bind w/o arrow function, which autobinds
    this.authHandler = this.authHandler.bind(this);
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
      //Display FB name or user's email based on traditional signup
      authData.user.displayName ? this.setState( {name: authData.user.displayName}) 
          : this.setState({ name: authData.user.email.split("@")[0]})
      
      this.setState( {email: authData.user.email});

      
    }    
  }
  
  logout = () => {
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
          isNullable: false,
          then () {
            //User just created account
            if(!this.state.user.profile) { 
              const setProfile = {
                profile : {
                  email: this.state.email,
                  name: this.state.name
                }
              }
              this.setState({
                user: setProfile 
              })
            }
          }
        })
      }
    })
  }
  
  render() {
    
    return (
      <Router>
        <div className="App">
      
          <Navitems user_id={this.state.user_id} name={this.state.name} logout={this.logout}/>
          <Switch>
            <Route path='/' render= { () =>  !this.state.name ? <Login authHandler={this.authHandler}/> : <Redirect to="/home"/>  } exact />

            <Route path='/home' render= { () => !this.state.name ? <Redirect to="/"/> : <Home user={this.state.user} name={this.state.name} user_id={this.state.user_id} _this={this}/> } exact />

            <Route path='/friends' render={ () => !this.state.name ? <Redirect to="/"/> : <Friendframe {...this.state} _this={this} />} exact />
            
            <Route path='/search' render={ () => !this.state.name ? <Redirect to="/"/> : <Search user={this.state.user} user_id={this.state.user_id}/>} exact/>
          </Switch>
          
          <Signup authHandler={this.authHandler} _this={this}/>
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
