import React from 'react';
import base from '../base';

const removeRequest = (e, key, user_id) => {
    e.preventDefault();
    base.remove(`users/${user_id}/friends/${key}`, 
        function(err) { if(err) console.log(err) });        
}

const acceptRequest = (e, freqs, user, user_id, name, email) => {
    e.preventDefault();
    
    //Find my friend's request ID
    const myFreqID = Object.keys(user.friends).find(key => 
        user.friends[key].key === freqs.key
    )

    //Accept my friend's request
    if(myFreqID) {
        base.post(`users/${user_id}/friends/${myFreqID}`, {
            data: {key: freqs.key, name: freqs.name, email: freqs.email, connected: true},
            then(err){ if(err) console.log(err) }
        });
    }


    //add current user to the friend
    base.push(`users/${freqs.key}/friends/`, {
        data: {key: user_id, name: name, email: email, connected: true},
        then(err){ if(err) console.log(err) }
    });
}

const Frequests = ({freqs, user, user_id, name, email}) => {
    
    const key = Object.keys(user.friends).find(key => user.friends[key] === freqs);
        
    return (
        <li className="list-group-item list-group-item-action "> 
            <h5  className="mb-0 d-flex justify-content-between">{freqs.name}
                <div className="btn-group">
                    <button type="button" className="btn btn-success btn-sm"
                        onClick={ (e) => acceptRequest(e, freqs, user, user_id, name, email)}>
                        Accept <i className="far fa-check-circle"></i>
                    </button>
                    <button type="button" className="btn btn-danger btn-sm" 
                        onClick={ (e) => removeRequest(e, key, user_id)}> 
                        Decline <i className="far fa-times-circle"></i>
                    </button>
                </div>
            </h5>
        </li>
    );
}

export default Frequests;