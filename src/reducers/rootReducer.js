import base from '.././base';

const initState = {
    user: {},
    name: null,
    email: null,
    user_id: null
}

const fetchProfile = (uid, _this) => {
    return new Promise(function(resolve) {
        base.fetch(`users/${uid}`, {
            context: _this,
            then(data) {
                resolve(data)
            }
        });
    })
}
    
const rootReducer = (state = initState, action) => {
    if(action.type === "LOGOUT") {
        return initState
    }
    if(action.type === "LOGGED") {
        console.log("Action: ",action.authData);
        
        let {displayName, email, uid} = action.authData;
        const name = displayName ? displayName : email.split("@")[0]

        return {
            ...initState,
            name: name,
            email: email,
            user_id: uid,
            user: action.user
        }     
       

    
    }
    return state
}

export default rootReducer;