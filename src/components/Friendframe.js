import React, { Component } from 'react';
import Frequests from './Frequests';
import AddFriend from './Addfriend';
import Friends from './Friends';

class Friendframe extends Component {

    render() {
        if(!this.props.user) {
            return (
                <div className="container mt-3">
                  <h5> Add some friends to get started, {this.props.name.split(" ")[0]}!</h5>
                  <AddFriend />

                  </div>
              )
        }

        //create freq/friends from true/flase connected!!!!!
        // const frequests = this.props.user.frequests;
        const friends = this.props.user.friends;

        let freqload, frenload;
            //filter friends vs friend requests
        let frequestFilter = friends.filter(friend => friend.connected === false);
        let friendFilter = friends.filter(friend => friend.connected === true);

        freqload = Object.keys(frequestFilter).map(key => <Frequests index={key} key={key} freqs={frequestFilter[key].name} />);
        frenload = Object.keys(friendFilter).map(key => <Friends index={key} key={key} frens={friends[key].name} />)
        
        return (
            <div>
                <div className="container" style={{ paddingTop: "20px" }} data-aos="fade-right"  data-aos-duration="1000">
                    <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#newfriends">
                        New Friend Requests!
                <span className="badge badge-warning">{freqload ? freqload.length : 0} </span>
                    </h6>
                    <div id="newfriends" className="collapse">
                        <ul className="list-group mb-3">
                            {
                                freqload
                            }
                        </ul>
                    </div>
                </div>
                <AddFriend user={this.props.user}/>
                {
                    frenload
                }
            </div>
        )
    }
}
export default Friendframe;