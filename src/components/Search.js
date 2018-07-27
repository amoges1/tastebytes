import React, { Component } from 'react';
import Sresult from './Sresult';
import axios from 'axios';


class Search extends Component {
  constructor() {
      super();
      this.getPlaces = this.getPlaces.bind(this);
      this.state = {
          position: {},
          choices : {}
      }
  }
  render() {

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
                <div className="form-check-inline">
                    <h6>Use My Location:</h6>
                </div>
                <div className="form-check-inline">

                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optradio"/>Yes
                    </label>
                </div>
                <div className="form-check-inline">
                    <label className="form-check-label">
                        <input type="radio" className="form-check-input" name="optradio"/>No
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success mt-2" onClick={(e) => this.getPlaces(e)}>Search <i className="fas fa-search"></i></button>
                </div>
            </form>  
            </div>              
        </div>
        <div className="container" style={{marginTop: "20px"}}>
            <div className="d-flex flex-row flex-wrap">
             {
                 this.state.choices ? 
                    Object.keys(this.state.choices)
                        .map(key => <Sresult key={key} index={key} result={this.state.choices[key]}/>) 
                    : null
             }
            </div>
        </div>
     </div>
    );
  }
  
  getPlaces(e) {
    e.preventDefault();

    const lat = this.state.position.coords ? this.state.position.coords.latitude : null;
    const long = this.state.position.coords ? this.state.position.coords.longitude : null;
    if(lat && long) {
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
                        address: business.location.display_address
                    };
                    results.push(result)            
                });
                this.setState({choices: results})
        
            });
        } else {
            alert("Enable GPS Location on your Browser");
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