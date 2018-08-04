import React, { Component } from 'react';

class Login extends Component {


  render() {
      let logged = this.props.name ? <h3>Click on Home and Start!</h3> : <h3>Please Log In</h3>
    return (
      <div>
      <div className="container text-center w-50 mt-3">
           
                 {/* <h1 className="h3 mb-3 font-weight-normal">Start Here</h1>  */}
                {/* <div className="form-group">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus=""/>        
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                </div>
                <div className="btn-group d-flex mb-3">
                    <button className="btn  btn-primary w-100" type="submit">Login</button>
                    <button className="btn  btn-secondary w-100" data-toggle="modal" data-target="#signup">Sign Up</button>
                </div> */}
                { logged }
                <button className="btn btn-primary" onClick={ () => this.props.authenticate('facebook')}>Continue with Facebook</button>
                <button className="btn btn-info" onClick={ () => this.props.authenticate('github')}>Continue with Github</button>
                <button className="btn btn-danger" onClick={ () => this.props.logout()}>Logout</button>
                
                {/* <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" 
                data-auto-logout-link="false" data-use-continue-as="false" onClick={ () => this.props.authenticate('facebook')}></div> */}
           
        </div>
      <div className="container text-center w-75 mt-3">
      <header className="Login-header border-bottom">
          <h1>Welcome to Tastebytes</h1>
          <em>Join the Fun!</em>
        </header>
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
     
       
     
    );
  }
}

export default Login;