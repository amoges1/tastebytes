import React, { Component } from 'react';



class Review extends Component {
    constructor() {
        super();
        this.state = {
            review: {}
        }
    }
    render() {
        const review = this.props.review;
        // console.log("this is reviews: ",this.props.review);
        // console.log(this.props.review.friend);
        
        return (
            <tr>
                <td>{ review.comment }</td>
                <td style={{textAlign: "center"}}>
                    <span className="badge badge-warning">
                        { review.score}
                    </span> 
                    <br/> <strong>{review.friend}</strong>
                </td>
            </tr>
        )
        
    }
}

export default Review;
