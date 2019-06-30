import React from 'react';
import Frequests from './Frequests';
import AddFriend from './Addfriend';
import Friends from './Friends';
import Rating from '../modals/Rating';
import { Redirect } from 'react-router';

const Friendframe = ({user, name, email, user_id}) => {
    
    if(!user.profile) {
        return <Redirect to="/" />
    }

    let freqload, frenload;
    
    if (user.friends) {
        let frequestFilter = []
        let friendFilter = []
        for (let key in user.friends) {
            user.friends[key].connected ? friendFilter.push(user.friends[key]) : frequestFilter.push(user.friends[key])
        }
        
        //Create lists of friends and friend requests with filter
        freqload = Object.keys(frequestFilter).map(key => <Frequests index={key} key={key} freqs={frequestFilter[key]} name={name} email={email} user={user} user_id={user_id} />);
        frenload = Object.keys(friendFilter).map(key => <Friends index={key} key={key} frens={friendFilter[key]} user={user} user_id={user_id} />)
    }   
       
    return (
        <div className="container" style={{ paddingTop: "20px" }} data-aos="fade-up" data-aos-duration="1000">
            {
                freqload.length > 0 ? (
                    <div className="container">
                    <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#newfriends"> New Friend Requests! <span className="badge badge-warning">{freqload ? freqload.length : 0} </span>
                    </h6>
                        <div id="newfriends" className="collapse">
                            <ul className="list-group mb-3">
                                {
                                    freqload
                                }
                            </ul>
                        </div>
                    </div>
                ) : null
            }
            {
                user.friends ? null : <h5> Add some friends to get started, {name ? name.split(" ")[0] : ""}!</h5>
            }
            <AddFriend user={user} user_id={user_id} name={name} email={email} />
            {
                frenload ? frenload  : null
            }
            <Rating user={user} _this={this} />
        </div>
    )
}

export default Friendframe;