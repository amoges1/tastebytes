import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navitems extends Component {

  render() {

    let navMenu = [
        "Home",
        "Friends",
        "Search"
    ];

    if(this.props.name) {
      
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
                            {
                                navMenu.map((nav, index) => {
                                    return <Link key={`${index}`} to={`/${nav.toLowerCase()}`} 
                                        className="nav-item nav-link navLink text-white"> {nav} </Link>
                                })
                            }
                            <div className="dropdown">
                                <a className="nav-item nav-link dropdown-toggle text-white" 
                                    id="userDropdown" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" href="#user">{this.props.name.split(" ")[0]}</a>
                                
                                <div className="dropdown-menu" aria-labelledby="userDropdown">
                                    {/* <a className="dropdown-item disabled">Password Reset</a>
                                    <a className="dropdown-item disabled">Delete Account</a> */}
                                    {/* TODO https://firebase.google.com/docs/auth/web/manage-users */}
                                    <Link to="/" className="dropdown-item" onClick={this.props.logout}>Logout</Link>
                                </div>    
                            </div>
                        </div> 
                    </div>       
                </div>
            </nav>
        );
    } 
    else {
        return null;
    }
  }
}

export default Navitems;