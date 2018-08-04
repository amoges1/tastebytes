import React, { Component } from 'react';



class Review extends Component {
  
    render() {
        const review = this.props.review;
        
        return (
            <tr>
                <td>
                <blockquote class="blockquote text-center">
                    <p className="mb-0">{ review.comment } </p>
                    <footer className="blockquote-footer">{review.name} </footer>
                </blockquote>
                {/* { review.comment } - <strong>{review.name}</strong>  */}
                </td>
                <td style={{textAlign: "center"}}>
                    <span className="badge badge-warning">
                        { review.score} 
                    </span> 
                </td>
            </tr>
        )
        
    }
}

export default Review;
