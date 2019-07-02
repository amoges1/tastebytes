import React from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';
import Share from '../modals/Share';
import { Redirect } from 'react-router';

const Home = ({user, user_id, name}) => {

    if(!name) {
      return <Redirect to="/"/>
    }
    
    //arrays => array.map; objects => Object.keys(objects).map
    let res = []
    let recs = []
    let friends = [] 

    //Separate user restaurants and recommendations
    for (let key in user.restaurants) {
      user.restaurants[key].added ? res.push(user.restaurants[key]) : recs.push(user.restaurants[key])
    }
   
    //Filter friends from friend requests
    for (let key in user.friends) {
      if(user.friends[key].connected) friends.push(user.friends[key])
    }
   
    return (
      <div>
        <Recsframe recs={recs} user={user} user_id={user_id}/>
        <Resframe res={res} user={user} name={name}/>
        <Share friends={friends} name={name} _this={this}/>
      </div>
    );
}

export default Home;