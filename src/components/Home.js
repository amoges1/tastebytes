import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';
import Share from '../modals/Share';
import { Redirect } from 'react-router';


class Home extends Component {

  
  render() {
   
   
    
    let restaurants = this.props.user.restaurants;
    let res = []
    let recs = []
    for (let key in restaurants) {
      if(restaurants[key].added === true) {
        res.push(restaurants[key])
      } else {
        recs.push(restaurants[key])
      }
    }
    let friends = [];
    let user_friends = this.props.user.friends;
    for (let key in user_friends) {
      if(user_friends[key].connected) {
        friends.push(user_friends[key])
      }
    }
   
    if(!this.props.name ) {
       return <Redirect to="/"/>
    } else {
      if (!this.props.user.restaurants) {
        return (
          <div className="container mt-3">
            <h5>Add some restaurants, {this.props.name ? this.props.name.split(" ")[0] : ""}!</h5>
          </div>
        )
      } else {
        return (
          <div>
            <Recsframe recs={recs} user={this.props.user} user_id={this.props.user_id}/>
            <Resframe res={res} user={this.props.user}/>
            <Share friends={friends} name={this.props.name}/>
          </div>
        );
      }
   
   }
  }
  
}

export default Home;