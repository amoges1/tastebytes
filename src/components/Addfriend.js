import React, { Component } from 'react';
import base from '../base';

class Addfriend extends Component {

    constructor() {
        super();
        this.state = {
            progress: false
        }
    }

    sendFrequest = (e) => {
        e.preventDefault();
        this.setState({ progress: true})
        let friendEmail = this.email.value;
        document.getElementById("message").innerHTML = "";
        document.getElementById("error").style.display = "none"; 

        if(friendEmail === this.props.email) {
            document.getElementById("message").innerHTML = `You can't add yourself silly :)`;
            document.getElementById("error").style.display = "block"; 
            this.setState({progress: false});
            return;
        }

        base.fetch('users', {
            context:this,
            asArray: true, //check friend exists
        }).then(users => { return users.find(user => user.profile.email === friendEmail)
        }).then(friend => {

            if(!friend) { 
                this.setState({progress: false});
                document.getElementById("message").innerHTML = "Friend not found!";
                document.getElementById("error").style.display = "block";
                return;
            }

            if(friend.profile)
            //friend has no friends/requests
            if(!friend.friends) {
                base.push(`users/${friend.key}/friends/`, {
                    data: {key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false},
                    then(err){ if(err) console.log(err)}
                });
                document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is sent!`;
                document.getElementById("error").style.display = "block"; 
                this.setState({progress: false});
                return;
            }

            const userExists = Object.keys(friend.friends).find(key => friend.friends[key].email === this.props.email )
            const connStatus = Object.keys(friend.friends).find(key => friend.friends[key].email === this.props.email && friend.friends[key].connected)
            
            if(!userExists) {
                base.push(`users/${friend.key}/friends/`, {
                    data: {key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false},
                    then(err){ if(err) console.log(err)}
                });
                document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is sent!`;
                document.getElementById("error").style.display = "block"; 
                this.setState({progress: false});
                return;
            }
            
            if(userExists && !connStatus) {
                document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is already sent!`;
                document.getElementById("error").style.display = "block"; 
                this.setState({progress: false});
                return;
            }

            if(userExists && connStatus) {
                document.getElementById("message").innerHTML = `You and ${friend.profile.name} are already best friends!`;
                document.getElementById("error").style.display = "block"; 
                this.setState({progress: false});
                return;
            }

            //User doesn't exist + no connection     
            base.push(`users/${friend.key}/friends/`, {
                data: {key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false},
                then(err){ if(err) console.log(err)}
            });
            document.getElementById("message").innerHTML = `Friend request to ${friend.profile.name} is sent!`;
            document.getElementById("error").style.display = "block"; 
            this.setState({progress: false});
            return;
        })
    }

    
    render() {
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
                <div className="alert alert-danger" id="error" style={{ display: "none"}}> 
                    <strong id="message"></strong>    
                </div>
                {
                    this.state.progress ? (
                        <div className="progress mt-2" style={{height: "30px"}}> <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" 
                        role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading</div></div> 
                    ) : null
                }
            </div>
        );
    }
}

export default Addfriend;