import React from 'react';

//Parent: Recsframe.js
//Recommendation of location by friend
const Rec = ({user, rec, addRec, removeRec, user_id}) => {
    //Find rec's ID within user's restaurant
    const key = Object.keys(user.restaurants).find(key => user.restaurants[key] === rec);
    const mapRec = `https://www.google.com/maps/search/${rec.name}+${rec.address}`
    
    return (
        <div className="card mt-15 mb-15" style={{marginTop: "15px", marginBottom: "15px"}}> 
            <div className="card-header bg-danger text-white">
                {rec.name}
            </div>
            <div className="card-body">
                <em className="card-text">{ rec.comment}<span> - {rec.friend}</span></em>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <div className="btn-group d-flex">
                    <button type="button" className="btn btn-sm btn-success" 
                        onClick={ (e) => addRec(e, key, user_id)}>Add <i className="fas fa-plus-circle"></i>
                    </button>
                        <a href={mapRec} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-warning">
                            Location <i className="fas fa-map-marker-alt"></i>
                        </a> 
                    <button type="button" className="btn btn-sm btn-danger" onClick={ (e) => removeRec(e, key, user_id)}>
                        Delete <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rec;