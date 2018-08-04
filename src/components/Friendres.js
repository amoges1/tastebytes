import React, { Component } from 'react';
import base from '../base';
class Friendres extends Component {
    
    constructor() {
        super();
        this.addRes = this.addRes.bind(this);
        this.showReview = this.showReview.bind(this);
        
    }
  
    addRes(e, res_name, res_address) {
        e.preventDefault();
        
        let shareRes = {
            name: res_name,
            address: res_address,
            added: true,
            rating: 0
        }

        base.fetch(`users/${this.props.user_id}/`, {
            context: this,
        }).then(user => {
            console.log(user.restaurants);
            let duplicate = false;
            if(user.restaurants) {
         
                for (let key in user.restaurants ) {
                    
                    if(user.restaurants[key].name === res_name && user.restaurants[key].address === res_address) {
                        duplicate = true;
                        alert(`You already have ${res_name} on ${res_address} in your list!`);
                        return;
                    }
                }
                if(!duplicate) {
                    base.push(`users/${this.props.user_id}/restaurants/`, {
                        data: shareRes, then(err){
                            if(err){ console.log(err); } else {
                            alert(`${res_name} on ${res_address} is now in your list!`);
                            }
                        }
                    });
                }
            } else {
                base.push(`users/${this.props.user_id}/restaurants/`, {
                    data: shareRes, then(err){
                        if(err){ console.log(err); } else {
                        alert(`${res_name} on ${res_address} is now in your list!`);
                        }
                    }
                });
            }     
        })
    }

    showReview(e, res_name, res_address) {
        e.preventDefault();
        document.getElementById("rres_name").innerHTML = res_name;
        document.getElementById("rres_address").innerHTML = res_address;
        let resID = e.target.getAttribute("data-res");
        let friendKey = e.target.getAttribute("data-friend");
        
        document.getElementById("submitReview").setAttribute("data-res", `${resID}`);
        document.getElementById("submitReview").setAttribute("data-friend", `${friendKey}`);


    }
    render() {
        const res = this.props.res;
        
        return (
            <tr>
                <td style={{textAlign: "center", marginTop: "7px"}}> <h5><strong>{res.name}</strong> 
                    <span className="badge badge-warning">{res.rating}</span> </h5></td>
                <td style={{textAlign: "center"}}> 
                    <div className="d-flex flex-wrap">
                        <button type="button" id={`${this.props.index}`} onClick={(e) => this.addRes(e, res.name, res.address)} className="btn btn-success flex-fill" data-toggle="modal" data-target="#add">
                                Add <i className="fas fa-plus-circle"></i>
                        </button> 
                        <button type="button" className="btn btn-warning flex-fill " data-toggle="modal" data-target="#map">
                                Location <i className="fas fa-map-marker-alt"></i>
                        </button>
                        <button type="button" data-res={`${this.props.index}`} data-friend={`${this.props.friendKey}`} onClick={(e) => this.showReview(e, res.name, res.address)} className="btn btn-danger flex-fill " data-toggle="modal" data-target="#rate">
                                Rate <i className="far fa-list-alt"></i>
                        </button> 
                    </div>
                </td>
            </tr>
        )

    }
}
export default Friendres;