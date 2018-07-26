import React, { Component } from 'react';
import Sresult from './Sresult';
class Search extends Component {
  constructor() {
      super();
      this.state = {
          position: {}
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
                    <button type="submit" className="btn btn-success mt-2">Search <i className="fas fa-search"></i></button>
                </div>
            </form>  
        </div>
    </div>
    <div className="container" style={{marginTop: "20px"}}>
        <div className="d-flex flex-row flex-wrap">
            <Sresult/>
            <Sresult/>
            <Sresult/>
            </div>
        </div>
     </div>
    );
  }
  
  getPlaces(e) {
    e.preventDefault();

    // if (this.state.position) {
    //     alert("Enable GPS Location on your Browser");
    // } else {
    
        const lat = this.state.position.coords ? this.state.position.coords.latitude : null;
        const long = this.state.position.coords ? this.state.position.coords.longitude : null;
        if(lat && long) {
            const term = this.term.value;
            const yelpUrl = "https://api.yelp.com/v3/businesses/search?term=" + term + "&latitude=" + lat + "&longitude=" + long;
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer shnGznzM0y3L-q814lEgiU-tsQLoXaAvCxQKvlpMLPjzig_IIssjroIGl7HS3dixCNk-2rLVJpfO_5Bb-ZXa8p-UTWeyAg9mQCzjz3fNeqLcyvw8YQBI_73uEZVTW3Yx");
          
           

        fetch(yelpUrl,{
                header: myHeaders
            }
        ).then( res => console.log(res))
        } else {
            alert("Enable GPS Location on your Browswer and refresh twice?");
        }
        
    // https://github.com/Yelp/yelp-fusion/tree/master/fusion/node}
    
    

  
    // alert(this.state.position.coords.latitude);
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
          (position => {this.setState({position})}
        )
      )
  }
}

export default Search;