import React, { Component } from 'react';
import Frequests from './Frequests';
import AddFriend from './Addfriend';
import Friends from './Friends';
import Rating from '../modals/Rating';
import { Redirect } from 'react-router';

class Friendframe extends Component {

    render() {

        const friends = this.props.user ? this.props.user.friends : null;
        let freqload, frenload;

        if (friends) {
            let frequestFilter = []
            let friendFilter = []
            for (var key in friends) {
                if (friends[key].connected === false) {
                    frequestFilter.push(friends[key])
                } else {
                    friendFilter.push(friends[key])
                }
            }

            freqload = Object.keys(frequestFilter).map(key => <Frequests index={key} key={key} freqs={frequestFilter[key]} name={this.props.name} email={this.props.email} user={this.props.user} user_id={this.props.user_id} />);
            frenload = Object.keys(friendFilter).map(key => <Friends index={key} key={key} frens={friendFilter[key]} user={this.props.user} user_id={this.props.user_id} />)

        }

        if (!this.props.user.profile) {
            return <Redirect to="/" />
        } else {

        if (!friends) {
            return (
                <div className="container" style={{ paddingTop: "20px" }} data-aos="fade-right" data-aos-duration="1000">
                    <div id="newfriends" className="collapse">
                        <ul className="list-group mb-3">
                            {
                                freqload ? freqload : null
                            }
                        </ul>
                    </div>
                    <h5> Add some friends to get started, {this.props.name ? this.props.name.split(" ")[0] : ""}!</h5>
                    <AddFriend user={this.props.user} user_id={this.props.user_id} name={this.props.name} email={this.props.email} />

                </div>

            )
        }
            return (
                <div>
                    <div className="container" style={{ paddingTop: "20px" }} data-aos="fade-right" data-aos-duration="1000">
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
                    <AddFriend user={this.props.user} user_id={this.props.user_id} name={this.props.name} email={this.props.email} />
                    {
                        frenload
                    }
                    <Rating user={this.props.user} />
                </div>
            )
        }
    }
}
export default Friendframe;