import React, { Component } from 'react';


class Sresult extends Component {
    // constructor() {
    //     super();
    // }
    render() {
        const result = this.props.result;
        console.log(this.props.key);
        
        
        return ( 
            <div className="col-md-4 col-sm-6" data-aos="fade-up"  data-aos-duration="2450"> 
                <div className="card" style={{width:"14rem", margin:"auto"}}>
                    <div className="card-header bg-danger text-white">
                        <h6 className="d-flex justify-content-between align-items-center">{result.name}
                            <span className="badge badge-warning">{result.rating}</span>
                        </h6>
                    </div>
                    <img src={`${result.image}`} alt="yelpRes" className="card-img-top"/>
                
                    <div className="card-body text-center">
                        <h6 className="card-text mt-2">{result.address.join(' ')}</h6>
                        <button data-name={result.name} data-address={result.address} className="btn btn-success" 
                        onClick={(e) => this.props.addPlace(e, result.name, result.address)}>Add <i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
            </div> 
        );
    }

}

export default Sresult;