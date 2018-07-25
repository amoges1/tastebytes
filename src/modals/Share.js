import React, { Component } from 'react';

class Share extends Component {
  render() {
    return (
        <div className="modal fade" id="share">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#28a745"}}>
                    <h5 className="modal-title" style={{color: "white"}}>Share</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center pb-2 mt-4 mb-2 border-bottom">
                            <h4>Shack Shack 
                            </h4>
                            <h5>123 Frank Street</h5>
                            <h5><span className="badge badge-pill badge-success">8.5</span></h5>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d-flex flex-column align-items-center" style={{marginTop: "20px"}}>
                            <h5>Share with 
                            <select name="friends" id="friend">
                                <option value="Anteneh">Anteneh</option>
                                <option value="Jennifer">Jennifer</option>
                            </select>
                        </h5>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" 
                        data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>   
    );
  }
}

export default Share;
