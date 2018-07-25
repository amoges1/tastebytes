import React, { Component } from 'react';
import base from '../base';

class Login extends Component {

    constructor() {
        super();
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
          uid: {}
        }
      }
     //facebook
  authenticate(provider) {
    console.log(`Trying ${provider}...`);
    base.authWithOAuthPopup(provider, this.authHandler); //returns as err,authdata callback
    
  }

  authHandler(err, authData) {
    console.log(authData);    
    if (err) { console.log(err); return}
    this.setState( {uid: authData.user.displayName})
  }

  componentDidMount() {
    base.onAuth((user) => {
      this.authHandler(null, { user })
    })
  }

  logout() {
    base.unauth();
    this.setState( {uid: null });
  }
  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <h1>Welcome to Tastebytes</h1>
        </header>
        <p className="App-intro">
          Join the fun now!
        </p>
        <div className="fb-login-button" data-max-rows="1" data-size="large" 
        data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" 
        data-use-continue-as="false" onClick={this.authenticate('facebook')}></div>
      </div>
    );
  }
}

export default Login;