import React, { Component } from 'react';
import Friendres from './Friendres';
import base from '../base';

//Parent: Friendframe.js
//Convert to Function?
class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0, //friends' list amount
            fresload: null //friends' list payload
        }
    }

    handleDeleteFriend = (friendID) => {
        const friendIndex = Object.keys(this.props.user.friends).filter(key => this.props.user.friends[key].key === friendID)
        // Delete friend from user's friends
        base.remove(`users/${this.props.user_id}/friends/${friendIndex}`)
        // Delete user from friend's friends
        base.fetch(`users/${friendID}/friends`, {
            context: this,
            then (friends) {
                const userIndex = Object.keys(friends).find(key => friends[key].key === this.props.user_id)
                base.remove(`users/${friendID}/friends/${userIndex}`)
            }
        })  
    }

    componentDidMount() {
        //get Friends' restaurants
        base.fetch(`users/${this.props.frens.key}/restaurants`, {
            context: this,
            then(frestaurants){
                if(frestaurants) {
                    let fresload = Object.keys(frestaurants).map(key => 
                        <Friendres _this={this} user={this.props.user} friendKey={this.props.frens.key} user_id={this.props.user_id} key={key} index={key} res={frestaurants[key]}/> );
                    this.setState({ amount: Object.keys(frestaurants).length, fresload })
                } 
            }
        });
    }
    
    render() {
        return (
            <div >
                <div className="container" style={{marginBottom: "10px"}}  role="tablist" aria-multiselectable="true" data-aos="fade-up"  data-aos-duration="1000">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: "red"}} id="userheading" data-toggle="collapse" data-parent="useraccordion"
                        data-target={`#${this.props.index}`} aria-expanded="true" aria-controls="restaurantID">
                            <h5 className="mb-0 d-flex justify-content-between" style={{color:"white"}}>  {this.props.frens.name}           
                                <span className="badge badge-success"> {this.state.amount}</span>
                            </h5>
                        </div> 
                    <div id={`${this.props.index}`} className="collapse show" role="tabpanel" aria-labelledby="userheading">
                        <div className="card-block container" >
                            <div className="row" style={{paddingTop: "20px"}}>
                                <div className="container">
                                    <table className="table table-striped ">
                                        <tbody>{this.state.fresload}</tbody>
                                    </table>
                                </div>
                            </div> 
                        </div>
                        <div className="container">
                            <button className="btn btn-secondary w-100 pb-1 mb-3" onClick={ () => this.handleDeleteFriend(`${this.props.frens.key}`) }>Delete {this.props.frens.name}</button>
                        </div> 
                    </div> 
                </div> 
            </div>
        </div>
        );
    }
}

export default Friends;