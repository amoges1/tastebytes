import React, { Component } from 'react';
import base from '../base';

class Signup extends Component {
    
    // fat arrows auto bind this (component)
    handleEmailCheck = (email) => {
        //component context required, utilizing autobind
        const _this = this;
        return new Promise(function(resolve, reject) {
            base.fetch(`users/`, {
                context: _this,
                then(users){
                    // for...in - object props
                    for (let key in users) {
                        if(users[key].profile.email === email) {
                            console.log("Signup email found:",users[key].profile.email);
                            resolve(true);
                        }
                    }
                    resolve(false);
                }
            })
        })
        
    }


    // fat arrows auto bind this (component)
    handleSubmit = (e) => {
        e.preventDefault()
        
        const email = this.form.email.value;
        const password = this.form.password.value;
        const cpassword = this.form.cpassword.value;
        let signMessage = document.getElementById("signMessage")
        let signError = document.getElementById("signError")

        if(password.length <= 5 || cpassword.length <= 5) {
            signMessage.innerHTML = "Password must be longer than 5 characters";
            signError.style.display = "block";
            return;
        }

        if(password !== cpassword) {
            signMessage.innerHTML = "Passwords do not match";
            signError.style.display = "block";
            return;
        }

        //return Promise for email verification
        this.handleEmailCheck(email).then( (exists) => { 
            if(exists) {
                signMessage.innerHTML = "Email is already taken";
                signError.style.display = "block";
            
            } else {
                //create user account, call parent's authHandler
                base.createUser({
                    email: email,
                    password: password
                }, this.props.authHandler);
                
                //close signup modal
                document.getElementById("close").click();
            }
        });    
    }
    render() {
        return (
            <div className="modal fade" id="signup">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h4 className="modal-title text-white">Create Account</h4>
                            <button type="button" id="close" className="close text-white" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <div className="container">
                                <form ref={ form => this.form = form } onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email"><strong>Email address:</strong></label>
                                        <input ref={ input => this.email = input} type="email" id="email" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd"><strong>Password:</strong></label>
                                        <input ref={ input => this.password = input} type="password" id="password" className="form-control" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpwd"><strong>Confirm Password:</strong></label>
                                        <input ref={ input => this.cpassword = input} type="password" id="cpassword" className="form-control" required />
                                    </div>
                                    <div className="alert alert-danger" id="signError" style={{ display: "none"}}> 
                                        <strong id="signMessage"></strong>    
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-success float-right font-weight-bold" >Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }   
    }

export default Signup;