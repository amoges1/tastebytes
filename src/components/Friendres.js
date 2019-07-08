import React from 'react';
import base from '../base';

const addPlace = (e, res_name, res_address, user_id, _this) => {
    e.preventDefault();
    base.fetch(`users/${user_id}/`, {
        context: _this,
    }).then(user => {

        //if empty restaurant list, create and add place
        if(!user.restaurants) {
            base.push(`users/${user_id}/restaurants/`, {
                data: {name: res_name, address: res_address, added: true, rating: 0}, 
                then(err){
                     err ? console.log(err) : alert(`${res_name} on ${res_address} is now in your list!`)
                    }
                }
            )
            return;
        }

        const found = Object.keys(user.restaurants).find(key =>
            user.restaurants[key].name === res_name && user.restaurants[key].address === res_address)
        
        !found ? (
            base.push(`users/${user_id}/restaurants/`, {
                data: {name: res_name, address: res_address, added: true, rating: 0}, 
                then(err){
                    err ? console.log(err) : alert(`${res_name} on ${res_address} is now in your list!`)
                    }
                }
            )
        ) : alert(`You already have ${res_name} on ${res_address} in your list!`)
    })
}

const showReview = (e, res_name, res_address) => {
    e.preventDefault();
    //Update Review modal's view
    document.getElementById("rres_name").innerHTML = res_name;
    document.getElementById("rres_address").innerHTML = res_address;
    let resID = e.target.getAttribute("data-res");
    let friendKey = e.target.getAttribute("data-friend");
    //Update Review modal's button for submission
    document.getElementById("submitReview").setAttribute("data-res", `${resID}`);
    document.getElementById("submitReview").setAttribute("data-friend", `${friendKey}`);

}

//List Friends' list of restaurants, ability to add, locate, and review
const Friendres = ({res, index, friendKey, user_id, _this}) => {
    
    const res_link = `https://www.google.com/maps/search/${res.name}+${res.address.split("+")}`;
    return (
        <tr>
            <td style={{textAlign: "center", marginTop: "7px"}}> 
                <h5> {res.name} <br /> <span className="badge badge-warning"> {res.rating}</span> </h5>
            </td>
            <td style={{textAlign: "center"}}> 
                <div className="d-flex flex-wrap">
                    <button type="button" id={`${index}`} onClick={(e) => addPlace(e, res.name, res.address, user_id, _this)} className="btn btn-success flex-fill m-1" data-toggle="modal" data-target="#add">
                            Add <i className="fas fa-plus-circle"></i>
                    </button> 
                    <a href={res_link} target="_blank" rel="noopener noreferrer" className="btn btn-warning flex-fill m-1">
                        Location <i className="fas fa-map-marker-alt"></i>
                    </a> 
                    <button type="button" data-res={`${index}`} data-friend={`${friendKey}`} 
                        onClick={(e) => showReview(e, res.name, res.address)} 
                        className="btn btn-danger flex-fill m-1" data-toggle="modal" data-target="#rate">
                            Rate <i className="far fa-list-alt"></i>
                    </button> 
                </div>
            </td>
        </tr>
    )
}

export default Friendres;