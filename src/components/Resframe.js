import React, { Component } from 'react';
import Resitems from './Resitems';


class Resframe extends Component {
    
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

    
}
export default Resframe;