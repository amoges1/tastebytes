import React from 'react';
import Resitems from './Resitems';
import { Link } from 'react-router-dom';

//Parent: Home.js 
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

//List all restaurants or suggest search
const Resframe = ({res, user, name}) => {
    return (
        <div className="container"  id="restaurantaccordion" role="tablist" aria-multiselectable="true">
        {
            res.length > 0 ? (
                Object.keys(res).map(key => {
                    //find Firebase ID
                    const id = Object.keys(user.restaurants)[key]   
                    return <Resitems id={id} index={key} key={key} place={res[key]} getShareInfo={getShareInfo.bind(null, user)} 
                            getDeleteInfo={getDeleteInfo.bind(null, user)} />
                })          
            ) : (
                <div className="container mt-3" data-aos="fade-up"  data-aos-duration="1000">
                    <h4>Add some restaurants, {name ? name.split(" ")[0] : ""}!</h4>
                    <button className="btn btn-success text-center"> 
                        <Link to="/search" className="nav-item nav-link text-white p-0">Start Here</Link>
                        </button>
                </div>
            )
        }
        </div> 
    )
}
export default Resframe;