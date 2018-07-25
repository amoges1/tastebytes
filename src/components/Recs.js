import React, { Component } from 'react';


class Recs extends Component {
   
    render() {
        const recs = this.props.recs;
        console.log(recs);
        
        return (
            <div className="card mt-15 mb-15" style={{marginTop: "15px", marginBottom: "15px"}}> 
                {/* <div className="card-header bg-danger text-white">
                    {recs.name}
                </div>
                <div className="card-body">
                    <em className="card-text">{ recs.comment}<span>{recs.friend}</span></em>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <div className="btn-group d-flex">
                        <button type="button" className="btn btn-sm btn-success ">Add <i className="fas fa-plus-circle"></i></button>
                        <button type="button" className="btn btn-sm btn-warning" data-toggle="modal" data-target="#map">Location <i className="fas fa-map-marker-alt"></i></button>
                        <button type="button" className="btn btn-sm btn-danger">Delete <i className="fas fa-trash-alt"></i></button>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Recs;