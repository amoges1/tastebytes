import React, { Component } from 'react';

import Login from './components/Login';
import Navitems from './components/Navitems';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Resitems from './components/Resitems';

import Friendframe from './components/Friendframe';
import Recsframe from './components/Recsframe';

import Search from './components/Search';
import Sresult from './components/Sresult';

import Share from './modals/Share';
import Map from './modals/Map';
import Delete from './modals/Delete';

import base from './base';
import logo from './logo.svg';
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
    
    let recsload;
    let resload;
    let freqload;
    let frenload;
    if (user1.restaurants) {
      resload = Object.keys(user1.restaurants).map(key => <Resitems index={key} key={key} res={user1.restaurants[key]}/>) 
      


    } else {
      //resload="<h3>Get Food </h3>";
    }
    // console.log("this is user1: ", user1);
    
    return (
     
      <div className="App">
        <header className="App-header">
         
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          {/* <button className="btn btn-success" onClick={ () => this.authenticate('facebook')}>Login with FB </button> */}

        </header>
        {/* <Navitems username={this.state.uid ? this.state.uid.split(" ")[0] : 'Test'}/> */}
        {/* <Router>
          <Route path='/home' component={} />
          <Route path='/recommendations' component={PirateDetail} />
          <Route path='/search' component={PirateDetail} />
        </Router> */}
        {/* <Navitems username={this.state.uid ? this.state.uid.split(" ")[0] : 'Test'}/> */}
        {/* <Login />  */}

        <Recsframe recs={user1.recommendations} />

        {/* <div className="container border-bottom mt-20" style={{ marginTop: "20px"}}>
          <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#recs">
              New Recommendations!
              <span className="badge badge-warning">{user1.recommendations ? user1.recommendations.length : null} </span>
          </h6>
          <div id="recs" className="collapse">
          {
            recsload
          }
          </div>
        </div> */}
        <div className="container" style={{paddingTop: "20px"}} id="restaurantaccordion" role="tablist" aria-multiselectable="true">
         {
           resload
         }
        </div> 
        <Share/>
        <Map/>
        <Delete/>

        <br />

      <Friendframe frequests={user1.frequests} friends={user1.friends}/>

        <br />

        <Search/>
        <div className="container" style={{marginTop: "20px"}}>
          <div className="d-flex flex-row flex-wrap">
            <Sresult/>
            <Sresult/>
            <Sresult/>
          </div>
        </div>


        
      </div>
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
