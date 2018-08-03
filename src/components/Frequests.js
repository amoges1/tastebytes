import React, { Component } from 'react';
import base from '../base';

class Frequests extends Component {
    
    constructor() {
        super();
        this.removeRequest = this.removeRequest.bind(this);
        this.addRequest = this.addRequest.bind(this);
    }
    render() {
    const freqs = this.props.freqs;
    return (
            <li className="list-group-item list-group-item-action "> 
                <h5  className="mb-0 d-flex justify-content-between">{freqs.name}
                    <div className="btn-group">
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={ (e) => this.addRequest(e, freqs)}>
                            Accept <i className="far fa-check-circle"></i>
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" 
                            onClick={ (e) => this.removeRequest(e, freqs)}> 
                            Decline <i className="far fa-times-circle"></i>
                        </button>
                    </div>
                </h5>
            </li>
            );
        }

    removeRequest(e, freqs){
        e.preventDefault();
        console.log(`users/${this.props.user_id}/friends/${freqs.total_friends}`);
        
        base.remove(`users/${this.props.user_id}/friends/${freqs.total_friends}`, 
            function(err) { 
                if(err) { console.log(err);  }
            });
        }

    addRequest(e, freqs){
        e.preventDefault();
        
        console.log(freqs);
        
        
        //update my friends
        const myFriends = this.props.user.friends;
        let friendKey;
        myFriends.forEach(friend => {
            if(friend.key === freqs.key) {        
                friendKey = friend.key;        
                base.database().ref(`users/${this.props.user_id}/friends/`)
                    .child(`${friend.total_friends}`)
                    .set({ key: freqs.key, name: freqs.name, email: freqs.email, connected: true, total_friends: friend.total_friends })  
            }
        });

        //add me to my friend
        console.log(freqs.key);
        
        base.fetch(`users/${friendKey}`, {
            context: this
        }).then(friend => {
            let friendLength = friend.friends ? friend.friends.length : 0;
            console.log("Hello ", this.props.name);
            
            base.database().ref(`users/${friendKey}/friends/`)
            .child(`${friendLength}`)
            .set({ key: this.props.user_id, name: this.props.name, email: this.props.email, connected: true, total_friends:friendLength }) 

            
        })
        //add to my friends
        // if(!this.props.user.friends) {
            
        //     base.post(`users/${this.props.user.user_id}/friends/0`, {
        //         data: { key: freqs.key, name: freqs.name, email: freqs.email, connected: true  }, then(err) {
        //             if(err) { console.log(err);  } 
        //         }
        //     })
        // } else {
        //     base.database().ref(`users/${freqs.key}/friends/`)
        //     .child(`${this.props.user.friends.length}`)
        //     .set({ key: freqs.key, name: freqs.name, email: freqs.email, connected: false }) 
        // // }
        
        // //update friends connected to true
        // console.log("THESE ARE THE VALUES, ", this.props.user_id,);
        
        // base.post(`users/${freqs.key}/friends/${this.props.user.user_id}`, {
        //     data: { key: this.props.user_id, name:this.props.user.username, 
        //         email: this.props.user.email, connected:true  },
        //     then(err){
        //         if(!err) { 
        //             alert(`You're now friends with ${freqs.name}.`);
        //         }
        //     }
        //     });
        }
}

export default Frequests;