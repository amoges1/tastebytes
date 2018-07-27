import React, { Component } from 'react';
import Recs from './Recs';

class Recsframe extends Component {
    
    render() {
        const recs = this.props.recs;
        console.log("recs length is ", recs ? recs.length : 0);
        
        
        let recsload;
        if (recs) {
            recsload = Object.keys(recs).map(key => <Recs index={key} key={key} recs={recs[key]} />)
        }
        return (
            <div className="container border-bottom mt-20" style={{ marginTop: "20px"}} data-aos="fade-right"  data-aos-duration="1000">
                <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#recs">
                    New Recommendations!
                    <span className="badge badge-warning">{recsload ? recsload.length : 0} </span>
                </h6>
                <div id="recs" className="collapse">
                    {
                        recsload
                    }
                </div>
            </div>
        )
    }
      
}
export default Recsframe;