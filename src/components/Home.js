import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';


class Home extends Component {

  render() {
    const user = this.props.user;
    const res = this.props.user.restaurants;
    const recs = this.props.user.recommendations;

    if (!user) {
      return (
        <div>
          <h5>User doesn't have restaurants or recommendations</h5>
        </div>
      )
    }
    return (
      <div>
        <Recsframe recs={recs}/>
        <Resframe res={res}/>
      </div>
    );
  }
}

export default Home;