import React, { Component } from 'react';

class Delete extends Component {
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
                            <h4>Shack Shack 
                            </h4>
                            <h5>123 Frank Street</h5>
                            <h5><span className="badge badge-pill badge-success">8.5</span></h5>
                        </div>
                    </div>                  
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>
    );
  }
}

export default Delete;
