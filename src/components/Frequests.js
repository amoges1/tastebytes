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
        let key = Object.keys(this.props.user.friends)
            .find(key => this.props.user.friends[key] === freqs);
        
    return (
            <li className="list-group-item list-group-item-action "> 
                <h5  className="mb-0 d-flex justify-content-between">{freqs.name}
                    <div className="btn-group">
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={ (e) => this.addRequest(e, freqs)}>
                            Accept <i className="far fa-check-circle"></i>
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" 
                            onClick={ (e) => this.removeRequest(e, key)}> 
                            Decline <i className="far fa-times-circle"></i>
                        </button>
                    </div>
                </h5>
            </li>
            );
        }

    removeRequest(e, key){
        e.preventDefault();
        base.remove(`users/${this.props.user_id}/friends/${key}`, 
            function(err) { 
                if(err) { console.log(err);  }
            });        
        }

    addRequest(e, freqs){
        e.preventDefault();
        
        //update my friends
        const myFriends = this.props.user.friends;
        for(var key in myFriends) {
            if(myFriends[key].key === freqs.key) {
                base.post(`users/${this.props.user_id}/friends/${key}`, {
                    data: {key: freqs.key, name: freqs.name, email: freqs.email, connected: true},
                    then(err){
                      if(err){
                        console.log(err);
                        ;
                      }
                    }
                  });
            }
        }

        //add me to my friend
            base.push(`users/${freqs.key}/friends/`, {
                data: {key: this.props.user_id, name: this.props.name, email: this.props.email, connected: true},
                then(err){
                  if(err){ console.log(err); }
                }
              });
        }
}

export default Frequests;