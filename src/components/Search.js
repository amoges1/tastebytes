import React, { Component } from 'react';
import Sresult from './Sresult';
import axios from 'axios';
import base from '../base';
import { Redirect } from 'react-router';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            position: null,
            choices : {},
            progress: false
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => this.setState({position})
        )
    }

    getPlaces = (e) => {
        e.preventDefault();
        
        if(this.state.position == null) {
            alert("Retrieving your location...Please make sure GPS Location is Enabled!");
            return;
        }
    
        this.setState({progress: true})
    
        const {latitude, longitude} = this.state.position.coords 
        const term = this.term.value;
        const config = {
            headers: {'Authorization': 'Bearer shnGznzM0y3L-q814lEgiU-tsQLoXaAvCxQKvlpMLPjzig_IIssjroIGl7HS3dixCNk-2rLVJpfO_5Bb-ZXa8p-UTWeyAg9mQCzjz3fNeqLcyvw8YQBI_73uEZVTW3Yx'},
            params: { term, latitude, longitude } //match names match keys   
        };
        //Send request to Yelp after header config, CORS = cross origin resource, prefix resolves issue 
        axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
        .then(response => {
            let results = response.data.businesses.map(business => {
                return {
                    name: business.name,
                    image: business.image_url,
                    rating: business.rating,
                    address: business.location.display_address,
                    reviews: []
                }
            })
            this.setState({choices: results, progress: false})
        });    
      }
    
    addPlace = (e, name, address) => {
        e.preventDefault();
        //If user has no restaurants
        if(!this.props.user.restaurants) {
            base.push(`users/${this.props.user_id}/restaurants/`, {
                data: {name: name, address: address.join(' '), rating:0, added: true },
                then(err){ 
                    err ? console.log(err) : alert(`${name} on ${address.join(' ')} is added to your list.`);
                }
            });
            return
        } 
       
        //check if restaurant is in list already
        const found = Object.keys(this.props.user.restaurants).find(key => 
            this.props.user.restaurants[key].name === name && this.props.user.restaurants[key].address === address.join(' '))
        
        //add restaurant if not found
        !found ? (
            base.push(`users/${this.props.user_id}/restaurants/`, {
                data: {name: name, address: address.join(' '), rating:0, added: true },
                then(err){ 
                    err ? console.log(err) : alert(`${name} on ${address.join(' ')} is added to your list.`);
                }
            })
        ) : alert(`${name} at ${address} is already added to your list.`)
    }

    render() {

    if(!this.props.user.profile) {
        return <Redirect to="/"/>
    } else {
        return (
            <div>
                <div className="container" style={{paddingTop: "20px", textAlign: "center"}}>
               
                <div className="container border-bottom">
                    <form ref={ (input) => this.searchForm = input } 
                        onSubmit={ (e) => this.getPlaces(e)}>
                        <div className="form-group">
                            <label htmlFor="term"><strong><h4>What are you craving?</h4></strong></label>
                            <input ref={ (input) => this.term = input } type="text" className="form-control" id="term" placeholder="Let me think..."/>
                        </div>
                        <div className="form-group">
                            <img src="../Yelp_trademark_RGB.png" alt="Yelp logo" width="100px"/>
                            <button type="submit" className="btn btn-success mt-2" onClick={(e) => this.getPlaces(e)}><strong>Search <i className="fas fa-search"></i></strong></button>
                        </div>
                    </form>  
                    </div>              
                </div>
                <div className="container" style={{marginTop: "20px"}}>
                   {
                       this.state.progress ? (
                            <div className="progress" style={{height: "30px"}}> 
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> 
                                    <h5 className="mb-0"> Loading </h5>
                                </div>
                            </div>
                       ) : null
                   }
                    <div className="d-flex flex-row flex-wrap">
                     {
                         this.state.choices ? 
                            Object.keys(this.state.choices)
                                .map(key => <Sresult key={key} index={key} result={this.state.choices[key]} addPlace={this.addPlace}/>) 
                            : null
                     }
                    </div>
                </div>
             </div>
            );
        
    }
  }
  
  
}

export default Search;