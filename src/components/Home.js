import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';


class Home extends Component {

  render() {
   
    if (!this.props.user) {
      return (
        <div className="container mt-3">
          <h5>User doesn't have restaurants or recommendations</h5>
        </div>
      )
    }
    
    const restaurants = this.props.user.restaurants;
    let res = restaurants.filter(res => res.added === true);
    let recs = restaurants.filter(rec => rec.added === false);
    
    // const recs = this.props.user.recommendations;
    return (
      <div>
        <Recsframe recs={recs}/>
        <Resframe res={res}/>
      </div>
    );
  }
}

export default Home;