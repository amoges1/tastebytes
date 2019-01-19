import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';
import Share from '../modals/Share';
import { Redirect } from 'react-router';


class Home extends Component {

  
  render() {
   
   
    //arrays => array.map; objects => Object.keys(objects).map
    const restaurants = this.props.user.restaurants;
    //Object.keys(x.state.user.restaurants).map( key => console.log(x.state.user.restaurants[key]))
    let res = []
    let recs = []
    //Filter restaurants and recommendations based on added status

    // const resIDs = this.props.user.restaurants ? Object.keys(this.props.user.restaurants).filter(res => res.added === true) : 0
    // const res = resIDs ? resIDs.map(id => this.props.user.restaurants[id]) : 0
    // const recsIDs = this.props.user.restaurants ? Object.keys(this.props.user.restaurants).filter(rec => rec.added === false) : 0
    // const recs = recsIDs ? recsIDs.map(id => this.props.user.restaurants[id]) : 0
    for (let key in restaurants) {
      if(restaurants[key].added === true) {
        res.push(restaurants[key])
      } else {
        recs.push(restaurants[key])
      }
    }
    //Filter friends from friend requests
    // let friends = this.props.user.friends ? Object.keys(this.props.user.friends).filter(friend => friend.connected === true) : 0
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
        return (
          <div>
            <Recsframe recs={recs} user={this.props.user} user_id={this.props.user_id}/>
            <Resframe res={res} user={this.props.user} name={this.props.name}/>
            <Share friends={friends} name={this.props.name}/>
          </div>
        );
   }
  }
  
}

export default Home;