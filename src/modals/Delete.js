import React, { Component } from 'react';
import base from '../base';
class Delete extends Component {

    constructor() {
        super();
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }

    deleteRestaurant(e) {
        e.preventDefault();
        
        let key = document.getElementById("deletebutton").getAttribute("data-key");
        
        base.remove(`users/${this.props.user_id}/restaurants/${key}`, 
            function(err) { 
                if(err) { console.log(err);  }
            });
    }
    render() {
    return (
        <div className="modal fade" id="delete">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#dc3545"}}>
                    <h5 className="modal-title" style={{color: "white"}}>Delete</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center ">
                            <h4 id="dres_name"> </h4>
                            <h5 id="dres_address"></h5>
                            <h5><span id="dres_rating" className="badge badge-pill badge-success"></span></h5>
                        </div>
                    </div>                  
                </div>
                <div className="modal-footer">
                    <button  id="deletebutton" data-key="0" onClick={ (e) => this.deleteRestaurant(e)} type="button" className="btn btn-danger" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>
    );
  }
}

export default Delete;
