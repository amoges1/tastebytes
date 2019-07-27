import React from 'react';
import base from '.././base';
import { Link } from 'react-router-dom';

//Parent: App.js
const handleDeleteAccount = (user_id, logout) => {
    window.confirm("Do you REALLY wish to delete your account?")
    logout()
    base.auth().currentUser.delete().then(() => { 
        base.remove(`users/${user_id}`)
        alert("Your account has been deleted!")
    }).catch( (err) => { console.log(err)});   
}

const Navitems = ({user_id, name, logout}) => {

    const navMenu = [
        "Home",
        "Friends",
        "Search"
    ];

    if(!name) { return null; }
   
    return (
        <nav className="navbar navbar-dark navbar-expand-sm" style={{backgroundColor:'red'}}>
            <div className="container">
                <Link to="/" className="navbar-brand"> TasteBytes</Link>
                
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#myNav" aria-controls="myNav" 
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> 
                
                <div className="collapse navbar-collapse" id="myNav">
                    <div className="navbar-nav ml-auto">
                        {
                            navMenu.map((navItem, index) => {
                                return <Link key={`${index}`} to={`/${navItem.toLowerCase()}`} 
                                    className="nav-item nav-link text-white"> {navItem} </Link>
                            })
                        }
                        <div className="dropdown">
                            <a className="nav-item nav-link dropdown-toggle text-white" 
                                id="userDropdown" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false" href="#user">{name.split(" ")[0]}</a>
                            
                            <ul className="dropdown-menu" aria-labelledby="userDropdown">                           
                                <Link to="/" className="dropdown-item" onClick={ () => handleDeleteAccount(user_id, logout)}>Delete Account</Link>
                                <Link to="/" className="dropdown-item" onClick={logout}>Logout</Link>
                            </ul>    
                        </div>
                    </div> 
                </div>       
            </div>
        </nav>
    );
}

export default Navitems;