import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Login extends Component {


  render() {
    let logged = this.props.name ? true : false;
    let error = <div className="alert alert-danger" id="error" style={{ display: "none"}}> 
                    <strong id="message"></strong>    
                </div>
    if(logged) {
       return <Redirect to="/home"/>
    } else {
    return (
      <div>
          <div className="container-fluid  Login-header border-bottom w-100 mt-3" style={{ background: "red"}}>
                <h1 style={{color:"white", marginTop:"-16px", paddingTop: "8px"}}>Welcome To TasteBytes</h1>
          </div>
        {/* <header className="container Login-header border-bottom w-100 mt-3" style={{ background: "red"}}>
             <h1>Welcome to TasteBytes</h1>
        </header> */}
        <div className="container text-center w-75 mt-3">
                {/* <h1 className="h3 mb-3 font-weight-normal">Start Here</h1>  */}
            <div className="form-group">
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="loginEmail"  className="form-control" placeholder="Email address" required="" autoFocus=""/>        
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="loginPassword"  className="form-control" placeholder="Password" required="" />
            </div>
            
                {error}
            
            <div className="btn-group d-flex justify-content-center mb-3  ">
                <button className="btn  btn-danger w-50 font-weight-bold" type="submit" onClick={ () => this.props.emailLogin() }>Login</button>
                <button className="btn  btn-warning w-50 text-white font-weight-bold" data-toggle="modal" data-target="#signup">Sign Up</button>
            </div>
            
            <div className="container">
                {/* <p>Continue wtih...</p> */}
                <div className="btn-group d-flex mb-3">
                    <button className="btn btn-primary w-100" onClick={ () => this.props.authenticate('facebook')}>
                        <strong> <i className="fab fa-facebook-square"></i> Continue with Facebook </strong> </button>
                    {/* <button className="btn btn-info w-100" onClick={ () => this.props.authenticate('github')}>Github</button> */}
                </div>

            </div>
            {/* <button className="btn btn-danger" onClick={ () => this.props.logout()}>Logout</button> */}
            
            {/* <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" 
            data-auto-logout-link="false" data-use-continue-as="false" onClick={ () => this.props.authenticate('facebook')}></div> */}
           
        </div>
        <div className="container text-center w-75 mt-3">
     
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
}

export default Login;