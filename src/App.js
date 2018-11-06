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
import Delete from './modals/Delete';

import base from './base';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.signup = this.signup.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
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
    // console.log(`1. Trying ${provider}...`);
    base.authWithOAuthPopup(provider, this.authHandler); //returns as err,authdata callback
  }

  authHandler(err, authData) {
    
    if (err && err.message) { 
      document.getElementById("message").innerHTML = err.message;
      document.getElementById("error").style.display = "block";
      return;
    }
    if(authData.user) {
      authData.user.displayName 
        ? this.setState( {name: authData.user.displayName}) 
        : this.setState({ name: authData.user.email.split("@")[0]});
      this.setState( {email: authData.user.email});
      base.fetch(`users/${this.state.user_id}`, {
        context: this
      }).then(user => {
        if (this.state.user_id !== null && this.state.name && !user.name) {
          base.database().ref(`users/${this.state.user_id}/profile`)
                  .set({ name: this.state.name, email: this.state.email })
        }
      });
      
    }    
  }

  emailLogin() {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
    
    base.authWithPassword({
      email    : loginEmail,
      password : loginPassword
    }, this.authHandler);
  }
  
  signup(e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    if(email === "" && password === "" && cpassword === "") {
      document.getElementById("signMessage").innerHTML = "Please fill out the form :(";
      document.getElementById("signError").style.display = "block";
      return;
    }
    if(password === cpassword) {
      if(password === "") {
        document.getElementById("signMessage").innerHTML = "No Password is a Bad Idea :(";
        document.getElementById("signError").style.display = "block";
        return;
      }
      //check if email exists
      base.fetch(`users/`, {
        context: this,
        then(users){
            let create = true;
            //loop through users
            for (let key in users) {
              if(users[key].profile.email === email) {
                // console.log(users[key].profile.email);
                create = false;
              }
            }
            if(create) {
              base.createUser({
                email: email,
                password: password
              }, this.authHandler);
              document.getElementById("email").value = "";
              document.getElementById("password").value = "";
              document.getElementById("cpassword").value = "";
            } else {
              document.getElementById("signMessage").innerHTML = "Email is in use already :(";
              document.getElementById("signError").style.display = "block";
            }
        }
     });
     
    } else {
      document.getElementById("signMessage").innerHTML = "Passwords do not match";
      document.getElementById("signError").style.display = "block";
    }
   
  }

  logout() {
    base.unauth();
    //console.log("Logged out");
    this.setState( {user: {}, name: null, email: null, user_id:null });
  }

  componentDidMount() {
    //console.log("3. onAuth");
    
    base.onAuth((user) => {
         this.setState( {user: {}, email: null, user_id: null, name:null });

      this.authHandler(null, { user })
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
    
    return (
      <Router>

        <div className="App">
      
          <Navitems name={this.state.name} logout={this.logout}/>
          <Switch>
            <Route path='/' render= { () =>  <Login name={this.state.name} authenticate={this.authenticate} emailLogin={this.emailLogin} logout={this.logout} signup={this.signup} /> } exact />
            <Route path='/home' render= { () => <Home user={this.state.user} name={this.state.name} user_id={this.state.user_id}/> } exact />
            <Route path='/friends' render={ () => <Friendframe user={this.state.user} name={this.state.name} user_id={this.state.user_id} email={this.state.email} />} exact />
            <Route path='/search' render={ () => <Search user={this.state.user} user_id={this.state.user_id}/>} exact/>
          </Switch>
           
          <Signup signup={this.signup}/>
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
