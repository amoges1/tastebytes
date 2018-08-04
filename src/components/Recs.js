import React, { Component } from 'react';
import base from '../base';

class Recs extends Component {
    constructor() {
        super();
        this.removeRec = this.removeRec.bind(this);
        this.addRec = this.addRec.bind(this);
    }

    render() {
        const recs = this.props.recs;
        let key = Object.keys(this.props.user.restaurants)
            .find(key => this.props.user.restaurants[key] === recs);
        
        
        return (
            <div className="card mt-15 mb-15" style={{marginTop: "15px", marginBottom: "15px"}}> 
                <div className="card-header bg-danger text-white">
                    {recs.name}
                </div>
                <div className="card-body">
                    <em className="card-text">{ recs.comment}<span> - {recs.friend}</span></em>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <div className="btn-group d-flex">
                        <button type="button" className="btn btn-sm btn-success" onClick={ (e) => this.addRec(e, key)}>Add <i className="fas fa-plus-circle"></i></button>
                        <button type="button" className="btn btn-sm btn-warning" data-toggle="modal" data-target="#map">Location <i className="fas fa-map-marker-alt"></i></button>
                        <button type="button" className="btn btn-sm btn-danger" onClick={ (e) => this.removeRec(e, key)}>
                            Delete <i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    removeRec(e, key){
        e.preventDefault();
        base.remove(`users/${this.props.user_id}/restaurants/${key}`, 
            function(err) { 
                if(err) { console.log(err);  }
            });
      }

    addRec(e, key){
    e.preventDefault();
    base.update(`users/${this.props.user_id}/restaurants/${key}`, {
        data: { added : true},
        then(err){
          if(err){
            console.log(err);
            ;
          }
        }
      });
   
    }
}

export default Recs;