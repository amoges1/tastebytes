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
                    <form action="/action_page.php">
                        <div className="form-group">
                            <label for="email"><strong>Username:</strong></label>
                            <input type="email" className="form-control" id="username" />
                        </div>
                        <div className="form-group">
                            <label for="email"><strong>Email address:</strong></label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="form-group">
                            <label for="pwd"><strong>Password:</strong></label>
                            <input type="password" className="form-control" id="pwd" />
                        </div>
                    </form>
                </div>
            </div>
    
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal">Sign Up</button>
            </div>
    
        </div>
        </div>
    </div>
        );
    }   
}

export default Signup;