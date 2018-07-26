import React, { Component } from 'react';

import Navitems from './components/Navitems';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Home from './components/Home';
import Friendframe from './components/Friendframe';

import Search from './components/Search';

import Share from './modals/Share';
import Map from './modals/Map';
import Delete from './modals/Delete';

import base from './base';
import './App.css';

class App extends Component {

  constructor() {
    super();
    // this.authenticate = this.authenticate.bind(this);
    // this.authHandler = this.authHandler.bind(this);
    // this.logout = this.logout.bind(this);
    this.state = {
      user1: {}
    }
  }
  // //facebook
  // authenticate(provider) {
  //   console.log(`Trying ${provider}...`);
  //   base.authWithOAuthPopup(provider, this.authHandler); //returns as err,authdata callback
    
  // }

  // authHandler(err, authData) {
  //   console.log(authData);
  //   console.log(authData.user.displayName);
    
  //   if (err) { console.log(err); return}
  //   this.setState( {uid: authData.user.displayName})
  // }

  // componentDidMount() {
  //   base.onAuth((user) => {
  //     this.authHandler(null, { user })
  //   })
  // }

  // logout() {
  //   base.unauth();
  //   this.setState( {uid: null });
  // }
  render() {
    const user1 = this.state.user1;
    
    // let resload;
    
    // if (user1.restaurants) {
    //   resload = Object.keys(user1.restaurants).map(key => <Resitems index={key} key={key} res={user1.restaurants[key]}/>) 
      

    // } else {
    //   //resload="<h3>Get Food </h3>";
    // }
    // console.log("this is user1: ", user1);
    
    return (
      <Router>

      <div className="App">
     
        <Navitems username={this.state.uid ? this.state.uid.split(" ")[0] : 'Test'}/>
        <Switch>
          <Route path='/' render= { () => <Home res={user1.restaurants} recs={user1.recommendations}/> } exact />
          <Route path='/friends' render={ () => <Friendframe frequests={user1.frequests} friends={user1.friends}/>} exact />
          <Route path='/search' component={Search} exact/>
        </Switch>
        

        <Share/>
        <Map/>
        <Delete/>

        
      </div>
      </Router>

    );
  }

  
  componentWillMount(){
    this.ref = base.syncState(`users/user3`, {
      context: this,
      state: 'user1'
    })
  }

  componentWillUmount() {
    base.removeBinding(this.ref)
  }
}

export default App;
