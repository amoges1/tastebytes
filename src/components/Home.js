import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';
import Share from '../modals/Share';


class Home extends Component {

  
  render() {
   
    if (!this.props.user || !this.props.user.restaurants) {
      return (
        <div className="container mt-3">
          <h5>Add some restaurants, {this.props.name}!</h5>
        </div>
      )
    }
    
    const restaurants = this.props.user.restaurants;
    let res = restaurants.filter(res => res.added === true);
    let recs = restaurants.filter(rec => rec.added === false);    
    let friends = this.props.user.friends.filter(friend => friend.connected === true);

    return (
      <div>
        <Recsframe recs={recs} user_id={this.props.user_id}/>
        <Resframe res={res} user={this.props.user}/>
        <Share friends={friends} name={this.props.name}/>
      </div>
    );
  }

  
}

export default Home;