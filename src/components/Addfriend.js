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
        let email = this.email.value;

        base.fetch('users', {
            context:this,
            asArray: true,
        }).then(users => {
            //loop through all users
            users.forEach(friend => {
                console.log(friend);
                //check if an user matches email
                if (friend.email === email) {
                    let sent = false;
                    //check if user already sent request
                    ///WHAT IF USER HAS NO FRIENDS???
                    this.props.user.friends.forEach(amigo => {
                        if (amigo.email === email && amigo.connected === false) {
                            alert(`Friend request was already sent to ${amigo.email}`);
                            sent = true;
                        }
                    });
                    //send request if empty
                    if(sent === false) {
                        this.setState({progress: false});

                        base.push(`users/${friend.key}/friends/`, {
                            data: {name: this.props.email, connected: false }, then(err) {
                                if(err) { console.log(err);  } 
                                else { 
                                    alert(`Friend request to ${friend.username} is sent!`); 

                                }
                            }
                        })
                    }

                }
            });

            if(this.state.progress === false) {
                alert("Friend not found!");
                this.setState({progress: false});
              }
            }
        )
    }

    render() {

        let progressbar; 
        if(this.state.progress) {
            progressbar = <div className="progress"> <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" 
            role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Loading</div></div>;
        }
        return (
        <div className="container" data-aos="fade-left"  data-aos-duration="1000">
            <form ref={ (input) => this.addfriend = input} onSubmit={(e) => this.sendFrequest(e)}>
                <div className="form-group">
                    <label htmlFor="email"><strong>Add a Friend:</strong> </label>
                    <div className="input-group">
                        <input ref={ (input) => this.email = input} type="email" className="form-control" placeholder="Enter email address..." />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-success" style={{borderRadius: "2px"}}>Send Request <i className="fas fa-user-plus"></i></button>
                        </span>
                    </div>
                </div>
            </form>
            {
                progressbar
            }
        </div>
     );
    }
}

export default Addfriend;