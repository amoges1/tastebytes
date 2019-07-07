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
import { connect } from 'react-redux';

class App extends Component {

  authHandler = (err, authData) => {
    
    if (err && err.message) { 
      console.log(err);              
      document.getElementById("message").innerHTML = err.message;
      document.getElementById("error").style.display = "block";
      return;
    }
    if(authData.user) {
      
      console.log("User logged in:", authData);
      //Facebook provides user's name or just use email?
      const _this = this
      base.fetch(`users/${authData.user.uid}`, {
        context: _this,
        then(data) {
            this.props.logged(authData.user, data, _this)
        }
    })
      // this.props.logged(authData.user, _this)
            
      //account retrieval/mapping info to app
      // base.fetch(`users/${this.props.user_id}`, {
      //   context: this
      // }).then(() => {
      //     base.database().ref(`users/${this.props.user_id}/profile`)
      //     .set({ name: this.props.name, email: this.props.email })
      // });
      
    }    
  }

  //WHAT TO DO WHEN DATA CHANGES FROM FIREBASE, NO MORE SYNCING!
  componentDidMount() {
    
    //Listens for authentication
    base.onAuth((user) => {
      // this.setState( {user: {}, email: null, user_id: null, name:null });
      
      this.authHandler(null, { user })
      //Sync with User data if authed
      if(user) { 
        // this.setState({user_id: user.uid}  ); 
        this.ref = base.syncState(`users/${this.props.user_id}`, {
          context: this,
          state: 'user',
          isNullable: true
        })
      }
    })
  }
  
  render() {
    // console.log("Userid is:",this.state.user_id);
    console.log("My props ",this.props);
    
    return (
      <Router>
        <div className="App">
          <Navitems name={this.props.name} logout={this.props.logout}/>
          <Switch>
            <Route path='/' render= { () =>  !this.props.name ? <Login authHandler={this.authHandler}/> : <Redirect to="/home"/>  } exact />

            <Route path='/home' render= { () => !this.props.name ? <Redirect to="/"/> : <Home user={this.props.user} name={this.props.name} user_id={this.props.user_id}/> } exact />

            <Route path='/friends' render={ () => !this.props.name ? <Redirect to="/"/> : <Friendframe {...this.props}  />} exact />
            
            <Route path='/search' render={ () => !this.props.name ? <Redirect to="/"/> : <Search user={this.props.user} user_id={this.props.user_id}/>} exact/>
          </Switch>
          
          <Signup authHandler={this.authHandler} _this={this}/>
          <Delete user_id={this.props.user_id}/>
          
        </div>
      </Router> 
    );
  }

  componentWillUmount() {
    base.removeBinding(this.ref)
  }
} 

const mapStateToProps = (state) => {    
  return {
    ...state
  }
}

//store.dispatch({type:, payload}); pass dispatch function below
const mapDispatchToProps = (dispatch) => {
  //maps return object to props for comp to use
  return {
    logout: () => {
      
      dispatch({type: "LOGOUT"})
      base.unauth();
    },
    logged: (authData, user, _this) => {
      dispatch({type: "LOGGED", authData, user, _this})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
