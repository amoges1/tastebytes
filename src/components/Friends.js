import React, { Component } from 'react';

class Friends extends Component {
    render() {
    const friend = this.props.frens;
    // console.log("this is friend: ", friend);

    return (
        <div >
            <div className="container" style={{marginBottom: "10px"}}  role="tablist" aria-multiselectable="true" data-aos="fade-up"  data-aos-duration="1000">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: "red"}} id="userheading" data-toggle="collapse" data-parent="useraccordion"
                    data-target={`#${this.props.index}`} aria-expanded="true" aria-controls="restaurantID">
                        <h5 className="mb-0 d-flex justify-content-between" style={{color:"white"}}>  {friend}           
                            <span className="badge badge-success"> Amount: 10</span>
                        </h5>
                    </div> 

                <div id={`${this.props.index}`} className="collapse show" role="tabpanel" aria-labelledby="userheading">
                    <div className="card-block container" >
                        <div className="row" style={{paddingTop: "20px"}}>
                            <div className="container">
                                <table className="table table-striped ">
                                    <tbody>
                                        <tr className="table-warning">
                                            <td style={{textAlign: "center", marginTop: "7px"}}> <h5><strong>Restaurant name is here</strong> <span className="badge badge-warning">8.5</span> </h5></td>
                                            <td style={{textAlign: "center"}}> 
                                                <div className="d-flex flex-wrap">
                                                    <button type="button" className="btn btn-success flex-fill" data-toggle="modal" data-target="#add">
                                                            Add <i className="fas fa-plus-circle"></i>
                                                    </button> 
                                                    <button type="button" className="btn btn-warning flex-fill " data-toggle="modal" data-target="#map">
                                                            Location <i className="fas fa-map-marker-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger flex-fill " data-toggle="modal" data-target="#rate">
                                                            Rate <i className="far fa-list-alt"></i>
                                                    </button> 
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign: "center", marginTop: "7px"}}> <h5><strong>Restaurant name is here</strong> <span className="badge badge-warning">8.5</span> </h5></td>
                                            <td style={{textAlign: "center"}}> 
                                                <div className="d-flex flex-wrap">
                                                    <button type="button" className="btn btn-success flex-fill" data-toggle="modal" data-target="#add">
                                                            Add <i className="fas fa-plus-circle"></i>
                                                    </button> 
                                                    <button type="button" className="btn btn-warning flex-fill " data-toggle="modal" data-target="#map">
                                                            Location <i className="fas fa-map-marker-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger flex-fill " data-toggle="modal" data-target="#rate">
                                                            Rate <i className="far fa-list-alt"></i>
                                                    </button> 
                                                </div>
                                            </td>                                    
                                        </tr>
                                        <tr className="table-warning">
                                            <td style={{textAlign: "center", marginTop: "7px"}}> <h5><strong>Restaurant name is here</strong> <span className="badge badge-warning">8.5</span> </h5></td>
                                            <td style={{textAlign: "center"}}> 
                                                <div className="d-flex flex-wrap">
                                                    <button type="button" className="btn btn-success flex-fill" data-toggle="modal" data-target="#add">
                                                            Add <i className="fas fa-plus-circle"></i>
                                                    </button> 
                                                    <button type="button" className="btn btn-warning flex-fill " data-toggle="modal" data-target="#map">
                                                            Location <i className="fas fa-map-marker-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger flex-fill " data-toggle="modal" data-target="#rate">
                                                            Rate <i className="far fa-list-alt"></i>
                                                    </button> 
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>
    </div>
    );
    }
}

export default Friends;