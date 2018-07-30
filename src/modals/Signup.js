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
                    <form ref={ (input) => this.signupForm = input}
                        onSubmit={(e) => this.props.signup(e)}>
                        <div className="form-group">
                            <label htmlFor="email"><strong>Username:</strong></label>
                            <input ref={ (input) => this.usernmae = input} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"><strong>Email address:</strong></label>
                            <input ref={ (input) => this.email = input} type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd"><strong>Password:</strong></label>
                            <input ref={ (input) => this.password = input} type="password" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary" >Sign Up</button>
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