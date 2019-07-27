import React from 'react';
import base from '../base';

//Parent: Friendframe.js 
const removeRequest = (e, key, user_id) => {
    e.preventDefault();
    base.remove(`users/${user_id}/friends/${key}`, 
        function(err) { if(err) console.log(err) });        
}

const acceptRequest = (e, frequest, user, user_id, name, email) => {
    e.preventDefault();
    //Find friend's request user account ID
    const frequestUID = Object.keys(user.friends).find(key => 
        user.friends[key].key === frequest.key
    )
    //Accept my friend's request
    if(frequestUID) {
        base.post(`users/${user_id}/friends/${frequestUID}`, {
            data: {key: frequest.key, name: frequest.name, email: frequest.email, connected: true},
            then(err){ if(err) console.log(err) }
        });
        //add current user to the friend
        base.push(`users/${frequest.key}/friends/`, {
            data: {key: user_id, name: name, email: email, connected: true},
            then(err){ if(err) console.log(err) }
        });
    }
}

const Frequests = ({frequest, user, user_id, name, email}) => {
    // Find friend request key within my friends' list
    const key = Object.keys(user.friends).find(key => user.friends[key] === frequest);
        
    return (
        <li className="list-group-item list-group-item-action "> 
            <h5  className="mb-0 d-flex justify-content-between">{frequest.name}
                <div className="btn-group">
                    <button type="button" className="btn btn-success btn-sm"
                        onClick={ (e) => acceptRequest(e, frequest, user, user_id, name, email)}>
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