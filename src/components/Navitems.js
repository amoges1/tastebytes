import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Navitems extends Component {
  render() {
    let username = this.props.name ? true : false;
    // console.log(username);
    if(username) {
        username = this.props.name.split(" ")[0];
        return (
            <nav className="navbar navbar-dark navbar-expand-sm" style={{backgroundColor:'red'}}>
                <div className="container">
                    <Link to="/" className="navbar-brand navLink"> TasteBytes</Link>
                    
                    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#myNav" aria-controls="myNav" 
                    aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="myNav">
                        <div className="navbar-nav ml-auto">
                            <Link to="/home" className="nav-item nav-link navLink">Home</Link>
                            <Link to="/friends" className="nav-item nav-link navLink">Friends</Link>
                            <Link to="/search" className="nav-item nav-link navLink">Search</Link>
                            <div className="dropdown">
                                <a className="nav-item nav-link dropdown-toggle" 
                                    id="userDropdown" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" href="#user">{username}</a>
                                
                                <div className="dropdown-menu" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="#logout" onClick={this.props.logout}>Logout</a>
                                </div>    
                            </div>
                        </div> 
                    </div>       
                </div>
            </nav>
        );
    } else {
        return <Redirect to="/"/>
    }

  }
}

export default Navitems;