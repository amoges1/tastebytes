import React, { Component } from 'react';
import Friendres from './Friendres';
import base from '../base';
class Friends extends Component {

    constructor() {
        super();
        this.state = {
            amount: 0,
            fresload: <p> Loading ...</p>
        }
    }
    componentWillMount() {
        let fresload;
        const friend = this.props.frens;

        //get Friends' restaurants
        base.fetch(`users/${friend.key}/restaurants`, {
            context: this,
            then(frestaurants){
                if(frestaurants) {
                    fresload = <table className="table table-striped "><tbody> {Object.keys(frestaurants).map(key => 
                        <Friendres user={this.props.user} friendKey={friend.key} user_id={this.props.user_id} key={key} index={key} res={frestaurants[key]}/>
                    )}</tbody></table>;
                    this.setState({ amount: Object.keys(frestaurants).length, fresload: fresload})
                    
                } else {
                    this.setState({ fresload: <p> {friend.key} does not have any restaurants </p>})
        
                }

            }
        });
    }
    render() {
   
        const friend = this.props.frens;


    return (
        <div >
            <div className="container" style={{marginBottom: "10px"}}  role="tablist" aria-multiselectable="true" data-aos="fade-up"  data-aos-duration="1000">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: "red"}} id="userheading" data-toggle="collapse" data-parent="useraccordion"
                    data-target={`#${this.props.index}`} aria-expanded="true" aria-controls="restaurantID">
                        <h5 className="mb-0 d-flex justify-content-between" style={{color:"white"}}>  {friend.name}           
                            <span className="badge badge-success"> {this.state.amount}</span>
                        </h5>
                    </div> 

                <div id={`${this.props.index}`} className="collapse show" role="tabpanel" aria-labelledby="userheading">
                    <div className="card-block container" >
                        <div className="row" style={{paddingTop: "20px"}}>
                            <div className="container">
                                       {this.state.fresload}
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