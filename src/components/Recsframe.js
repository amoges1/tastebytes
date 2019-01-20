import React from 'react';
import Rec from './Rec';
import base from '../base';


const removeRec = (e, key, user_id) => {
    e.preventDefault();
    base.remove(`users/${user_id}/restaurants/${key}`, 
    function(err) { 
        if(err) { console.log(err);  }
    });
}

const addRec = (e, key, user_id) =>{
    e.preventDefault();
    base.update(`users/${user_id}/restaurants/${key}`, {
        data: { added : true},
        then(err){
            if(err){ console.log(err); }
        }
    });
}

const Recsframe = ({recs, user, user_id}) => {
    
    return (
        <div className="container mt-20" style={{ marginTop: "20px"}} data-aos="fade-right"  data-aos-duration="1000">
            {
                recs.length > 0 ? (
                    <div>
                        <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#recs">
                            New Recommendations! <span className="badge badge-warning">{recs.length} </span>
                        </h6>
                        <div id="recs" className="collapse">
                            {
                                Object.keys(recs).map(key => <Rec index={key} key={key} rec={recs[key]} 
                                user={user} user_id={user_id} addRec={addRec} removeRec={removeRec}/>)
                            }
                        </div>
                    </div>
                ) : null
            }
            
        </div>
    )  
}
export default Recsframe;