import React from 'react';
import base from '../base';

const addReview = (e, user, _this) => {
     
    e.preventDefault();
    let resID = e.target.getAttribute("data-res");
    let friendKey = e.target.getAttribute("data-friend");
    
    if(friendKey === null || resID === null) {
        alert("Sorry, please try again...")
        return;
    }

    let review = {
        name: user.profile.name,
        comment: document.getElementById("review").value,
        score: document.getElementById("score").value
    }

   
    base.fetch(`users/${friendKey}/restaurants/${resID}`, {
        context: _this
    }).then(restaurant => {
        //friend's restaurant has no reviews
        if(!restaurant.reviews) {
            base.push(`users/${friendKey}/restaurants/${resID}/reviews`, {
                data: review,
                then(err){ err ? console.log(err) : alert(`Your review has been sent!`) }
            });
            //update restaurant's rating
            base.update(`users/${friendKey}/restaurants/${resID}`, {
                data: { rating: review.score },
                then(err) {if (err) console.log(err)}
            });
            return;
        } 
        
        //friend's restaurant has several reviews
        const reviewed = Object.keys(restaurant.reviews).find(key=> restaurant.reviews[key].name === review.name)

        !reviewed ? (
            base.push(`users/${friendKey}/restaurants/${resID}/reviews`, {
                data: review,
                then(err){ err ? console.log(err) : alert(`Your review has been sent!`)

                //calculate and update restaurant's average rating
                base.fetch(`users/${friendKey}/restaurants/${resID}/reviews`, {
                    context:_this
                }).then(reviews => {
                    const scores = Object.keys(reviews).map(key => reviews[key].score)
                    const sumScores = scores.reduce((total, score) => { return parseInt(total) + parseInt(score)} )
                    const average = sumScores/Object.keys(reviews).length;
                    base.update(`users/${friendKey}/restaurants/${resID}/`, {
                        data: { rating: average },
                        then(err) { if (err) console.log(err)  }
                    }); 
                })}
            })
        ) : (
            alert('You already reviewed this restaurant')
        )
    })
}

const Rating = ({user, _this}) => {
    
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
                    <button type="button" id="submitReview" onClick={(e) => addReview(e, user, _this)} className="btn btn-danger" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div> 
    </div>
    )
}

export default Rating;