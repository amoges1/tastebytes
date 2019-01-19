import React from 'react';
import Resitems from './Resitems';

const getShareInfo =  (user, e, id) => {
    e.preventDefault();
    let shareRes = user.restaurants[id];
    // update share modal
    document.getElementById("res_name").innerHTML = shareRes.name;
    document.getElementById("res_address").innerHTML = shareRes.address;
    document.getElementById("res_rating").innerHTML = shareRes.rating;
    
}

const getDeleteInfo =  (user, e, id) => {
    e.preventDefault();
    let shareRes = user.restaurants[id];
    //update delete modal
    document.getElementById("dres_name").innerHTML = shareRes.name;
    document.getElementById("dres_address").innerHTML = shareRes.address;
    document.getElementById("dres_rating").innerHTML = shareRes.rating;
    document.getElementById("deletebutton").setAttribute("data-key", id);
}

const Resframe = ({res, user, name}) => {

    //Return all restaurants with share/delete ability    
    return (
        <div className="container" style={{paddingTop: "20px"}} id="restaurantaccordion" role="tablist" aria-multiselectable="true">
        {
            res.length > 0 ? (
                Object.keys(res).map(
                    key => {
                    //find Firebase ID
                    const id = Object.keys(user.restaurants)[key]   
                    return <Resitems id={id} index={key} key={key} place={res[key]} getShareInfo={getShareInfo.bind(null, user)} 
                            getDeleteInfo={getDeleteInfo.bind(null, user)} />
                })          //function.bind(callback, binding data??)
            ) : (
                <div className="container mt-3">
                    <h5>Add some restaurants, {name ? name.split(" ")[0] : ""}!</h5>
                </div>
            )
        }
        </div> 
    )
}
export default Resframe;