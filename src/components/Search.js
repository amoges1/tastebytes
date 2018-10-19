import React, { Component } from 'react';
import Sresult from './Sresult';
import axios from 'axios';
import base from '../base';
import { Redirect } from 'react-router';

class Search extends Component {
  constructor() {
      super();
      this.getPlaces = this.getPlaces.bind(this);
      this.addPlace = this.addPlace.bind(this);

      this.state = {
          position: {},
          choices : {},
          progress: false
      }
  }
  render() {

    let progressbar; 
    if(this.state.progress) {
       progressbar = <div className="progress" style={{height: "30px"}}> <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger w-100 text-white" 
        role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> <h5 className="mb-0"> Loading </h5></div></div>;
    }
    
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
                            <input ref={ (input) => this.term = input } type="text" className="form-control" id="term" placeholder="El Dorado...Answer to Life"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success mt-2" onClick={(e) => this.getPlaces(e)}>Search <i className="fas fa-search"></i></button>
                        </div>
                    </form>  
                    </div>              
                </div>
                <div className="container" style={{marginTop: "20px"}}>
                   {
                       progressbar
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
  
  getPlaces(e) {
    e.preventDefault();
    
    const lat = this.state.position.coords ? this.state.position.coords.latitude : null;
    const long = this.state.position.coords ? this.state.position.coords.longitude : null;
    if(lat && long) {
        this.setState({ progress: true})
        const term = this.term.value;
        const config = {
            headers: {'Authorization': 'Bearer shnGznzM0y3L-q814lEgiU-tsQLoXaAvCxQKvlpMLPjzig_IIssjroIGl7HS3dixCNk-2rLVJpfO_5Bb-ZXa8p-UTWeyAg9mQCzjz3fNeqLcyvw8YQBI_73uEZVTW3Yx'},
            params: {
                term: term,
                latitude: lat,
                longitude: long
            }
            };

            axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
            .then(response => {
                let businesses = response.data.businesses;
                let results = []
                businesses.forEach(business => {
                    let result = {
                        name: business.name,
                        image: business.image_url,
                        rating: business.rating,
                        address: business.location.display_address,
                        reviews: []
                    };
                    results.push(result) 
                    this.setState({choices: results, progress: false})           
                });
                
        
            });
        } else {
            alert("Retrieving your location...Please make sure GPS Location is Enabled!");
        }
          
  }

  addPlace(e, name, address){
    e.preventDefault();
    
    if(!this.props.user.restaurants) {
        base.push(`users/${this.props.user_id}/restaurants/`, {
            data: {name: name, address: address.join(' '), rating:0, added: true },
            then(err){
              if(err){
                console.log(err);
              } else {
                alert(`${name} on ${address.join(' ')} is added to your list.`); 

              }
            }
          });
      
    } else {

        let contain = false;
        const restaurants = this.props.user.restaurants;
        for (var key in restaurants) {
            if(restaurants[key].name === name && restaurants[key].address === address.join(' ')) {
                contain = true;
            }
        }
    

        if (!contain) {
            base.push(`users/${this.props.user_id}/restaurants/`, {
                data: {name: name, address: address.join(' '), rating:0, added: true },
                then(err){
                  if(err){
                    console.log(err);
                    ;
                  }
                }
              });
            alert(`${name} on ${address.join(' ')} is added to your list.`);
        } else {
            alert(`${name} at ${address} is already added to your list.`)
        }
    }
  }
  
  componentWillMount() {
      navigator.geolocation.getCurrentPosition(
          (position => {this.setState({position})}
        )
      )
  }
}

export default Search;