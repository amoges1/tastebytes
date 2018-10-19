import React, { Component } from 'react';
import base from '../base';

class Addfriend extends Component {

    constructor() {
        super();
        this.sendFrequest = this.sendFrequest.bind(this);
        this.state = {
            progress: false
        }
    }

    sendFrequest(e) {
        e.preventDefault();
        this.setState({ progress: true})
        let inputEmail = this.email.value;
        console.log(inputEmail, " is the target");
        document.getElementById("message").innerHTML = "";
        document.getElementById("error").style.display = "none"; 

        //check if target is self
        if(inputEmail === this.props.user.profile.email) {
            document.getElementById("message").innerHTML = "You can't add yourself, silly :)";
            document.getElementById("error").style.display = "block"; 
            this.setState({progress: false});
            return;
        } else {
            base.fetch('users', {
                context:this,
                asArray: true,
            }).then(users => {
                let friendExists = false;
                let sent = false;
                //check database for user
                users.forEach(friend => {
                    
                    if (friendExists === true && sent === true) {
                        this.setState({progress: false});
                        return;
                    }
                    //friend exists in DB
                    if (friend.profile.email === inputEmail) {
                        
                        friendExists = true;
                        //Friend has no friends/frequests
                        if(friend.friends) {
                             //check if friend has me
                             for( let key in friend.friends) {
                                 if(friend.friends[key].email === this.props.email 
                                    && friend.friends[key].connected === true) {
                                        document.getElementById("message").innerHTML = `You and ${friend.profile.name} are already best friends!`;
                                        document.getElementById("error").style.display = "block"; 
                                        sent = true;
                                        this.setState({progress: false});
                                        return;
                                    } else if (friend.friends[key].email === this.props.email 
                                        && friend.friends[key].connected === false) {
                                            document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is already sent!`;
                                            document.getElementById("error").style.display = "block"; 
                                            sent = true;
                                            this.setState({progress: false});
                                            return;
                                        }
                             }
                           
                        }  
                        
                        //send request if friend exists
                        if(friendExists === true && sent === false) {
                                
                                base.push(`users/${friend.key}/friends/`, {
                                    data: {key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false},
                                    then(err){
                                      if(err){
                                        console.log(err);
                                        ;
                                      }
                                    }
                                  });
                           
                            document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is sent!`;
                            document.getElementById("error").style.display = "block"; 
                            sent = true;
                            this.setState({progress: false});
                                    
                        } 
                    } 
                });
                    if(!friendExists) {
                        this.setState({progress: false});
                        document.getElementById("message").innerHTML = "Friend not found!";
                        document.getElementById("error").style.display = "block";
                    }
                }
            )
        }
       
    }

    render() {
        let error = <div className="alert alert-danger" id="error" style={{ display: "none"}}> 
                        <strong id="message"></strong>    
                    </div>

        let progressbar; 
        if(this.state.progress) {
            progressbar = <div className="progress mt-2" style={{height: "30px"}}> <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" 
            role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading</div></div>;
        }
        return (
        <div className="container" data-aos="fade-left"  data-aos-duration="1000">
            <form ref={ (input) => this.addfriend = input} onSubmit={(e) => this.sendFrequest(e)}>
                <div className="form-group">
                    <div className="input-group">
                        <input ref={ (input) => this.email = input} type="email" className="form-control" placeholder="Enter email address..." />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-success" style={{borderRadius: "2px"}}> 
                                <strong><i className="fas fa-user-plus"></i> Send Request</strong></button>
                        </span>
                    </div>
                </div>
            </form>
            {error}
            {
                progressbar
            }
        </div>
     );
    }
}

export default Addfriend;