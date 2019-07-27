import React from 'react';
import Review from './Review';

//Parent: Resframe.js
//Each restaurant contains location and reviews
const Resitems = ({place, id, getShareInfo, getDeleteInfo}) => {
    const mapPlace = `https://www.google.com/maps/search/${place.name}+${place.address}`

    return (
        <div className="card" style={{marginBottom: "10px"}} data-aos="fade-up"  data-aos-duration="1000">
            <div className="card-header" style={{ backgroundColor: "red"}} id="restaurantheading" data-toggle="collapse" data-parent="restaurantaccordion"
            data-target={`#${id}`} aria-expanded="true" aria-controls="restaurantID">
                <h5 className="mb-0 d-flex justify-content-between" style={{color: "white"}}>
                    {place.name}
                    <span className="badge badge-success">{place.rating}</span>
                </h5>
            </div> 

            <div id={`${id}`} className="collapse show" role="tabpanel" aria-labelledby="restaurantheading">
                <div className="card-block container" >
                    <div className="mt-3 mb-0">
                            <h5 className="lead">  {place.address}</h5>
                    </div>
                    <div className="d-flex btn-group" style={{paddingTop: "20px"}}>
                        <button onClick={ (e) => getShareInfo(e, id)} type="button" className="btn btn-success flex-fill" data-toggle="modal" data-target="#share">
                            Share <i className="fas fa-user-friends"></i>
                        </button>
                        <a href={mapPlace} target="_blank" rel="noopener noreferrer" className="btn btn-warning flex-fill">
                            Location <i className="fas fa-map-marker-alt"></i>
                        </a> 
                        <button data-key={id} onClick={ (e) => getDeleteInfo(e, id)} type="button" className="btn btn-danger flex-fill" data-toggle="modal" data-target="#delete">
                            Delete <i className="fas fa-trash-alt"></i></button>
                    </div> 
                    <div className="row" style={{paddingTop: "20px"}}>
                        <div className="container">
                            <table className="table table-striped ">
                                <tbody>
                                    {
                                        place.reviews ? (
                                            Object.keys(place['reviews']).map( key=>
                                                <Review key={key} review={place['reviews'][key]}/>)
                                        ) : (     
                                            null
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div> 
            </div> 
        </div> 
    );
    
}

export default Resitems;