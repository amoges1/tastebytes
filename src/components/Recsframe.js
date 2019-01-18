import React, { Component } from 'react';
import Rec from './Rec';
import base from '../base';

class Recsframe extends Component {
    
    removeRec = (e, key) => {
        e.preventDefault();
        base.remove(`users/${this.props.user_id}/restaurants/${key}`, 
        function(err) { 
            if(err) { console.log(err);  }
        });
    }

    addRec = (e, key) =>{
        e.preventDefault();
        base.update(`users/${this.props.user_id}/restaurants/${key}`, {
            data: { added : true},
            then(err){
                if(err){ console.log(err); }
            }
        });
    }

    render() {

        return (
            <div className="container border-bottom mt-20" style={{ marginTop: "20px"}} data-aos="fade-right"  data-aos-duration="1000">
                <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#recs">
                    { this.props.recs.length > 0 ? "New Recommendations!" : "No Recommendations"}
                    <span className="badge badge-warning">{this.props.recs ? this.props.recs.length : 0} </span>
                </h6>
                <div id="recs" className="collapse">
                    {
                        Object.keys(this.props.recs).map(key => <Rec index={key} key={key} rec={this.props.recs[key]} 
                            user={this.props.user} addRec={this.addRec} removeRec={this.removeRec}/>)
                    }
                </div>
            </div>
        )
    }
      
}
export default Recsframe;