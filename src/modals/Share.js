import React, { Component } from 'react';
import base from '../base';
class Share extends Component {

    constructor() {
        super();
 
        this.shareRestaurant = this.shareRestaurant.bind(this);
    }

    shareRestaurant(e) {
        e.preventDefault();
        
        let res_name = document.getElementById("res_name").innerHTML;
        let res_address = document.getElementById("res_address").innerHTML;
        let comment = document.getElementById("comment").value;
        let friend = document.getElementById("friend");
        let friendkey = friend.options[friend.selectedIndex].getAttribute("index")
        console.log("This is friend, ", friendkey);
        
        //build object
        let shareRes = {
            name: res_name,
            address: res_address,
            added: false,
            rating: 0,
            comment: comment,
            friend: this.props.name
        }
        
        base.fetch(`users/${friendkey}`, {
            context: this
        }).then(friend => {
            //check their list
            if(!friend.restaurants) {
                base.database().ref(`users/${friendkey}/restaurants/`)
                .child("0").set(shareRes);
                alert(`Recommendation to ${friend.profile.name} is sent!`);
 
            } else {
                let duplicate = false;
                friend.restaurants.forEach(res => {
                    if(res.name === res_name && res.address === res_address) {
                        duplicate = true;
                    }
                });

                if (!duplicate) {
                    base.database().ref(`users/${friendkey}/restaurants/`)
                    .child(`${friend.restaurants.length}`).set(shareRes) 
                    alert(`Recommendation to ${friend.profile.name} is sent!`);
                } else {
                    alert(`${friend.profile.name} has ${res_name} at ${res_address} on their list!`);
                }
            }
        });        

    }
    render() {
        let friendList = <p> Add some friends to share your favorite restaurants </p>;
        if(this.props.friends) {
            friendList = 
            <select name="friends" id="friend"> 
                ${this.props.friends.map(
                    friend => <option key={friend.key} index={friend.key} value={friend.name}> {friend.name} </option>)}
            </select>;
        }
        
        
    return (
        <div className="modal fade" id="share">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#28a745"}}>
                    <h5 className="modal-title" style={{color: "white"}}>Share</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center pb-2 mt-4 mb-2 border-bottom">
                            <h4 id="res_name"> </h4>
                            <h5 id="res_address"></h5>
                            <h5><span id="res_rating" className="badge badge-pill badge-success"></span></h5>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex flex-column align-items-center" style={{marginTop: "20px"}}>
                            <h5>Share with:
                                <br />  
                                {friendList}
                            </h5>
                        </div>
                        <div className="d-flex flex-column align-items-center" style={{marginTop: "20px"}}>
                        <textarea id="comment" rows="4" cols="50" defaultValue="This place is great!"></textarea>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={ (e) => this.shareRestaurant(e)} type="button" className="btn btn-success" 
                        data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>   
    );
  }
}

export default Share;
