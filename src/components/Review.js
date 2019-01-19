import React from 'react';

const Review = ({review}) => {  
    return (
        <tr>
            <td>
            <blockquote className="blockquote text-center">
                <p className="mb-0">{ review.comment } </p>
                <footer className="blockquote-footer">{review.name} </footer>
            </blockquote>
            </td>
            <td style={{textAlign: "center"}}>
                <span className="badge badge-warning">
                    { review.score} 
                </span> 
            </td>
        </tr>
    )
}


export default Review;
