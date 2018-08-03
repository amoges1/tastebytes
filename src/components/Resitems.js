import React, { Component } from 'react';
import Review from './Review';

class Resitems extends Component {
    constructor() {
        super();
        this.getShareInfo = this.getShareInfo.bind(this);
        this.state = {
            res: {}
        }
    }
    getShareInfo(e) {
        e.preventDefault();
        let shareRes = this.props.user.restaurants[this.props.index];
       
        document.getElementById("res_name").innerHTML = shareRes.name;
        document.getElementById("res_address").innerHTML = shareRes.address;
        document.getElementById("res_rating").innerHTML = shareRes.rating;


        
    }
    render() {
        const res  = this.props.res;
        let resload;
        if (res.reviews) {
            resload = Object.keys(res['reviews']).map( key=>
                <Review key={key} review={res['reviews'][key]}/>
            )
        } 

        return (
            
            <div className="card" style={{marginBottom: "10px"}} data-aos="fade-up"  data-aos-duration="1000">
                <div className="card-header" style={{ backgroundColor: "red"}} id="restaurantheading" data-toggle="collapse" data-parent="restaurantaccordion"
                data-target={`#${this.props.index}`} aria-expanded="true" aria-controls="restaurantID">
                    <h5 className="mb-0 d-flex justify-content-between" style={{color: "white"}}>
                        {res.name}
                        <span className="badge badge-success">{res.rating}</span>
                    </h5>
                </div> 

                <div id={`${this.props.index}`} className="collapse show" role="tabpanel"
                aria-labelledby="restaurantheading">
                    <div className="card-block container" >
                        <div className="d-flex btn-group" style={{paddingTop: "20px"}}>
                            <button onClick={ (e) => this.getShareInfo(e)} type="button" className="btn btn-success flex-fill" data-toggle="modal" data-target="#share">
                                Share <i className="fas fa-user-friends"></i>
                            </button>
                            <button type="button" className="btn btn-warning flex-fill" data-toggle="modal" data-target="#map">
                                Location <i className="fas fa-map-marker-alt"></i>
                            </button> 
                            <button data-key={this.props.index} onClick={ (e) => this.props.removePlace(e, this.props.index)} type="button" className="btn btn-danger flex-fill" data-toggle="modal" data-target="#delete">
                                Delete <i className="fas fa-trash-alt"></i></button>
                        </div> 
                        <div className="row" style={{paddingTop: "20px"}}>
                            <div className="container">
                                <table className="table table-striped ">
                                    <tbody>
                                        {
                                            
                                            resload
                                        
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div> 
        );
    }
}

export default Resitems;