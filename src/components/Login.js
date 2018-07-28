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
      <div>
      <div className="container text-center w-50 mt-3">
            <form>
                 {/* <h1 className="h3 mb-3 font-weight-normal">Start Here</h1>  */}
                <div className="form-group">
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus=""/>        
                </div>
                <div className="form-group">
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                </div>
                <div className="btn-group">
                        <button className="btn btn-lg btn-primary " type="submit">Login</button>
                        <button className="btn btn-lg btn-primary " type="submit">Continue with Facebook</button>
            
                        <button className="btn btn-lg btn-secondary " data-toggle="modal" data-target="#signup">Sign Up</button>
        
                </div>
            </form>
        </div>
      <div className="container text-center w-75 mt-3">
        <h3 className="border-bottom">Join the Fun!</h3>
        <div className="row">
            <div className="col-md-6 mb-3 mt-3">
                <h3><i className="fas fa-home"></i> </h3>
                <h4><em>Create with Yelp</em></h4>
                <h5>
                    Create your own list of restaurants, cafes and more to try after searching for places with the help of Yelp.
                </h5>
            </div>
            <div className="col-md-6 mb-3 mt-3">
                <h3><i className="fas fa-user-friends"></i> </h3>
                <h4><em>Share with Friends</em></h4>
                <h5>After building your list, share it with your friends. See what places you may have common and head there together.</h5>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 mb-3 mt-3">
                <h3><i className="fas fa-search"></i> </h3>
                <h4><em>Recommend Locations</em></h4>
                <h5>You and your friends may have different tastes in locations to visit so feel free to recommend some places from your own list.</h5>
            </div>
            <div className="col-md-6 mb-3 mt-3">
                <h3><i className="fas fa-list-ul"></i></h3>
                <h4> <em>Rate and Comment</em></h4>
                <h5>Review your friends' lists and comment on their picks - your opinion may finally push them to check out a place so let them know.</h5>
            </div>
        </div>
    </div>
    </div>
      // <div className="Login">
      //   <header className="Login-header">
      //     <h1>Welcome to Tastebytes</h1>
      //   </header>
      //   <p className="App-intro">
      //     Join the fun now!
      //   </p>
      //   <div className="fb-login-button" data-max-rows="1" data-size="large" 
      //   data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" 
      //   data-use-continue-as="false" onClick={this.authenticate('facebook')}></div>
      // </div>
    );
  }
}

export default Login;