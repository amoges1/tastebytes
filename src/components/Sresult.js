import React, { Component } from 'react';

class Sresult extends Component {
    render() {
        return ( 
            <div className="col-md-4 col-sm-6">
                <div className="card" style={{width:"14rem", margin:"auto"}}>
                    <div className="card-header bg-danger text-white">
                        <h6 className="d-flex justify-content-between align-items-center">Restaurant name
                            <span className="badge badge-warning">4.5</span>
                        </h6>
                    </div>
                    <img src="http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg" alt="yelpRes" className="card-img-top"/>
                
                    <div className="card-body text-center">
                        <h6 className="card-text mt-2">100 Washington Square Park</h6>
                        <button className="btn btn-success">Add <i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Sresult;