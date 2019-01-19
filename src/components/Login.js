import React from 'react';
import base from '../base';


const handleSubmit = (e, authHandler) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    base.authWithPassword({
        email    : email,
        password : password
    }, authHandler);
}

const handleFacebookLogin = (provider, authHandler) => {
    base.authWithOAuthPopup(provider, authHandler); //returns as err,authdata callback
}

const Login = ({authHandler}) => {
    return (
        <div>
            <div className="container-fluid  Login-header border-bottom w-100 mt-3" style={{ background: "red"}}>
                <h1 style={{color:"white", marginTop:"-16px", paddingTop: "8px"}}>Welcome To TasteBytes</h1>
            </div>
        
            <div className="container text-center w-75 mt-3">
                <form onSubmit={(e) => handleSubmit(e, authHandler)}>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address: </label>
                        <input type="email" id="loginEmail" className="form-control" placeholder="Email address" required/>        
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password"  id="loginPassword"  className="form-control" placeholder="Password" required />
                    </div>
                    <div className="alert alert-danger" id="error" style={{ display: "none"}}> 
                        <strong id="message"></strong>    
                    </div>
                    <div className="btn-group d-flex justify-content-center mb-3">
                        <button type="submit" className="btn  btn-danger w-50 font-weight-bold" >Login</button>
                        <button className="btn  btn-warning w-50 text-white font-weight-bold" data-toggle="modal" data-target="#signup">Sign Up</button>
                    </div>
                
                </form>
                <div className="container-fluid">
                    <button className="btn btn-primary w-100" onClick={ () => handleFacebookLogin('facebook', authHandler)}>
                        <strong> <i className="fab fa-facebook-square"></i> Continue with Facebook </strong> 
                    </button>
                </div>
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
    )
}

export default Login;