import React, { Component } from 'react';
import base from '../base';

class Rating extends Component {
    constructor() {
        super();
        this.addReview = this.addReview.bind(this);
        this.state = {}
    }

    addReview(e) {
        console.log(e);
        
        e.preventDefault();
        let name = this.props.user.profile.name;
        let comment = document.getElementById("review").value;
        let score = document.getElementById("score").value;
        let resID = e.target.getAttribute("data-res");
        let friendKey = e.target.getAttribute("data-friend");
        console.log(`users/${friendKey}/restaurants/${resID}`);
        
        let review = {
            name: name,
            comment: comment,
            score: score
        }

        if(friendKey !== null && resID !== null) {
            
            base.fetch(`users/${friendKey}/restaurants/${resID}`, {
                context: this
            }).then(restaurant => {
                if(!restaurant.reviews) {
                    //check if I made a review
                    base.push(`users/${friendKey}/restaurants/${resID}/reviews`, {
                        data: review,
                        then(err){
                          if(err){console.log(err);} 
                          else {alert(`Your review has been sent!`);}
                        }
                      });
                      
                      base.fetch(`users/${friendKey}/restaurants/${resID}`, {
                          context:this
                      }).then(res => {
                          let average = 0;
                          let count = 0;
                          for (let key in res.reviews) {
                              average += res.reviews[key].score;
                              count += 1
                            //   console.log("adding ", res.reviews[key].score);
                              
                          }
                          average = average/count
                          
                          base.update(`users/${friendKey}/restaurants/${resID}`, {
                            data: { rating: average },
                            then(err) {
                              if (err) {console.log(err); }
                            }
                          });
                      })
                } else {
                    for (let key in restaurant.reviews) {
                        if(restaurant.reviews[key].name === name) {
                            alert("You already reviewed this restaurant!");
                            return;
                        }
                    }
                    base.push(`users/${friendKey}/restaurants/${resID}/reviews`, {
                        data: review,
                        then(err){
                          if(err){console.log(err);} 
                          else {
                            base.fetch(`users/${friendKey}/restaurants/${resID}/reviews`, {
                                context:this
                            }).then(reviews => {
                                let average;
                                for (let key in reviews) {
                                    average += reviews[key].score;
                                }
                                average /= reviews.length
                                base.update(`users/${friendKey}/restaurants/${resID}/`, {
                                  data: { score: average },
                                  then(err) {
                                    if (err) {console.log(err); }
                                  }
                                });
                            })
                            alert(`Your review has been sent!`);}
                        }
                      }); 
                    
                }
            });
        } else {
            alert("Sorry, please try again...");
        }
        
    }
    render() {
        return (
        <div className="modal fade" id="rate">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#dc3545"}}>
                    <h5 className="modal-title" style={{color: "white"}}>Review</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="d-flex flex-column align-items-center pb-2 mt-4 mb-2 border-bottom">
                            <h4 id="rres_name">""</h4>
                            <h5 id="rres_address">""</h5>
                        </div>
                    </div> 
                    <div className="container">
                            <div className="form-group">
                                <label htmlFor="score"><strong>Score:</strong></label>
                                <select className="form-control" name="score" id="score">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>    
                                </select>
                            </div>
                           <div className="form-group">
                                <label htmlFor="review"><strong>Review:</strong></label>
                                <textarea className="form-control" name="review" id="review" cols="20" rows="6" defaultValue="This place is good!"></textarea>    
                           </div>
                    </div>                 
                </div>
                <div className="modal-footer">
                    <button type="button" id="submitReview" onClick={(e) => this.addReview(e)} className="btn btn-danger" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
        </div>
        )
    }
}

export default Rating;