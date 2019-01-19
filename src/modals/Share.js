import React from 'react';
import base from '../base';

const sharePlace = (e, name, _this) => {
    e.preventDefault();
    let friend = document.getElementById("friend");
    let friendID;
    if (friend.options[friend.selectedIndex]) {
        friendID = friend.options[friend.selectedIndex].getAttribute("index")
        console.log("friendid", friendID);
        
    } else {
        alert("Cannot share - You have no friends :(")
        return;
    }

    let res_name = document.getElementById("res_name").innerHTML;
    let res_address = document.getElementById("res_address").innerHTML;
    let comment = document.getElementById("comment").value;
    
    //friend here is current user
    let place = {
        name: res_name, address: res_address,
        added: false, rating: 0, comment: comment,
        friend: name
    }
    
    base.fetch(`users/${friendID}`, {
        context: _this
    }).then(friend => {
        //friend has no restaurant list, just add
        if(!friend.restaurants) {
            base.push(`users/${friendID}/restaurants/`, {
                data: place,
                then(err){ 
                    err ? console.log(err) : alert(`Recommendation to ${friend.profile.name} is sent!`)
                }
            });
            return
        } 
        
        //only add if restaurant not found in friend's list
        const found = Object.keys(friend.restaurants).find(key => 
            friend.restaurants[key].name === res_name && friend.restaurants[key].address === res_address)

        !found ? (
            base.push(`users/${friendID}/restaurants/`, {
                data: place,
                then(err){ 
                    err ? console.log(err) : alert(`Recommendation to ${friend.profile.name} is sent!`)
                }
            })
        ) : alert(`${friend.profile.name} has ${res_name} at ${res_address} on their list!`) 
    });        
}

const Share = ({friends, name, _this}) => {
  
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
                            <h4 id="res_name">""</h4>
                            <h5 id="res_address">""</h5>
                            <h5><span id="res_rating" className="badge badge-pill badge-success"></span></h5>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex flex-column align-items-center" style={{marginTop: "20px"}}>
                            <h5>Share with:
                                <br />  
                                <select name="friends" id="friend"> 
                                {
                                    friends ? (
                                        friends.map(
                                            friend => <option key={friend.key} index={friend.key} value={friend.name}> {friend.name} </option>)
                                    ) : null
                                }
                                </select>
                            </h5>
                        </div>
                        <div className="d-flex flex-column align-items-center" style={{marginTop: "20px"}}>
                        <textarea id="comment" rows="4" cols="50" defaultValue="This place is great!"></textarea>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={ (e) => sharePlace(e, name, _this)} type="button" className="btn btn-success" 
                        data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>   
    );
}

export default Share;
