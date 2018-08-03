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
        
        base.fetch('users', {
            context:this,
            asArray: true,
        }).then(users => {
            let friendExists = false;
            let sent = false;
            let friend_key;
            let total_friends;
            //check database for user
            users.forEach(friend => {
                friend_key = friend.key;
                
                if (friendExists === true && sent === true) {
                    this.setState({progress: false});
                    return;
                }
                //friend exists in DB
                if (friend.email === inputEmail) {
                    
                    friendExists = true;
                    console.log("This is the friend key", friend.key);
                    total_friends = friend.total_friends;
                    //Friend has no friends/frequests
                    if(friend.friends) {
                         //check if friend has me
                         friend.friends.forEach(me => {
                            
                            if(me.email === this.props.email && me.connected === true) {
                                alert(`You and ${friend.username} are already best friends!`); 
                                sent = true;
                                this.setState({progress: false});
                                return;
                            } else if (e.email === this.props.email && me.connected === false) {
                                alert(`Friend request to ${friend.username} is already sent!`); 
                                sent = true;
                                this.setState({progress: false});
                                return;
                            }
                        });
                    }  
                    
                    //send request if friend exists
                    if(friendExists === true && sent === false) {
                        // console.log("I'm here");
                        // console.log(`users/${this.props.user_id}/friends/4`);
                    
                        //add me to desired friend
                        if(!friend.friends) {
                            console.log("tHESE ARE THE VALUES", friend_key, this.props.name, this.props.email);
                            let total_friends = total_friends ? total_friends : 0;
                            base.database().ref(`users/${friend.key}/friends/`).child(total_friends)
                            .set({ key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false, total_friends: total_friends }) 
                            
                            // base.post(`users/${friend.key}/friends/`, {
                            //     data: { key: friend_key, name: this.props.name, email: this.props.email, connected: false  }, then(err) {
                            //         if(err) { console.log(err);  } 
                            //     }
                            // })
                        } else {
                            base.database().ref(`users/${friend.key}/friends/`).child(`${friend.friends.length}`)
                            .set({ key: this.props.user_id, name: this.props.name, email: this.props.email, connected: false }) 
                        }
                       
                        alert(`Friend request to ${friend.username} is sent!`); 
                        sent = true;
                        this.setState({progress: false});
                                
                    } 
                } 
            });
                if(!friendExists) {
                    alert("Friend not found!");
                    this.setState({progress: false});
                }
            }
        )
    }

    render() {

        let progressbar; 
        if(this.state.progress) {
            progressbar = <div className="progress mt-2" style={{height: "30px"}}> <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" 
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