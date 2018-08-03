import React, { Component } from 'react';
import Resitems from './Resitems';
import base from '../base';


class Resframe extends Component {
    constructor() {
        super();
        this.removePlace = this.removePlace.bind(this);
    }
    render() {
        const res = this.props.res;

        let resload;
        if (res) {
            resload = Object.keys(res).map(
                key => <Resitems index={key} key={key} res={res[key]} user={this.props.user} removePlace={this.removePlace} />)
        }
        return (
            <div className="container" style={{paddingTop: "20px"}} id="restaurantaccordion" role="tablist" aria-multiselectable="true">
            {
                resload
            }
            </div> 
        )
    }

    removePlace(e, index){
        e.preventDefault();
        console.log(`users/user3/restaurants/${index}`);
        
        base.remove(`users/user3/restaurants/${index}`, 
            function(err) { 
                if(err) { console.log(err);  }

            });
      }
}
export default Resframe;