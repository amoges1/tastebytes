import React, { Component } from 'react';
import Frequests from './Frequests';
import AddFriend from './Addfriend';
import Friends from './Friends';

class Friendframe extends Component {

    render() {
        const frequests = this.props.frequests;
        const friends = this.props.friends;

        let freqload, frenload;
        if (frequests && friends) {
            freqload = Object.keys(frequests).map(key => <Frequests index={key} key={key} freqs={frequests[key]} />);
            frenload = Object.keys(friends).map(key => <Friends index={key} key={key} frens={friends[key]} />)
        }
        return (
            <div>
                <div className="container" style={{ paddingTop: "20px" }}>
                    <h6 className="alert alert-warning alert-heading d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#newfriends">
                        New Friend Requests!
                <span className="badge badge-warning">{frequests ? frequests.length : 0} </span>
                    </h6>
                    <div id="newfriends" className="collapse">
                        <ul className="list-group mb-3">
                            {
                                freqload
                            }
                        </ul>
                    </div>
                </div>
                <AddFriend />
                {
                    frenload
                }
            </div>
        )
    }
}
export default Friendframe;