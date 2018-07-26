import React, { Component } from 'react';
import Recsframe from './Recsframe';
import Resframe from './Resframe';


class Home extends Component {

  render() {
    const res = this.props.res;
    const recs = this.props.recs;
    return (
      <div>
        <Recsframe recs={recs}/>
        <Resframe res={res}/>
      </div>
    );
  }
}

export default Home;