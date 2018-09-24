import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
    <div className="modal" id="signup">
        <div className="modal-dialog">
        <div className="modal-content">
    
            <div className="modal-header bg-danger">
            <h4 className="modal-title text-white">Create Account</h4>
            <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
            </div>
    
            <div className="modal-body">
                <div className="container">
                    <form ref={ (input) => this.signupForm = input }
                        onSubmit={ (e) => this.props.signup(e)}>
                        <div className="form-group">
                            <label htmlFor="email"><strong>Email address:</strong></label>
                            <input ref={ (input) => this.email = input} type="email" id="email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd"><strong>Password:</strong></label>
                            <input ref={ (input) => this.password = input} type="password" id="password" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpwd"><strong>Confirm Password:</strong></label>
                            <input ref={ (input) => this.password = input} type="password" id="cpassword" className="form-control" required />
                        </div>
                        <div className="alert alert-danger alert-dismissible " id="signError" style={{ display: "none"}}> 
                            <button type="button" className="close" data-dismiss="alert">&times;</button> 
                            <strong id="signMessage"></strong>    
                        </div>
                        <div>
                            <button type="submit" onClick={(e) => this.props.signup(e)} className="btn btn-success float-right" >Join</button>
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