import React, { Component } from 'react';
import base from '../base';

class Frequests extends Component {
    
    constructor() {
        super();
        this.removeRequest = this.removeRequest.bind(this);
        // this.addRequest = this.addRequest.bind(this);
    }
    render() {
    const freqs = this.props.freqs;
    return (
            <li className="list-group-item list-group-item-action "> 
                <h5  className="mb-0 d-flex justify-content-between">{freqs}
                    <div className="btn-group">
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={ (e) => this.addRequest(e, freqs)}>
                            Accept <i className="far fa-check-circle"></i>
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" data-index={this.props.index}
                            onClick={ (e) => this.removeRequest(e, this.props.index)}> 
                            Decline <i className="far fa-times-circle"></i>
                        </button>
                    </div>
                </h5>
            </li>
            );
        }

        removeRequest(e, index){
            e.preventDefault();
            console.log(`users/user3/frequests/${index}`);
            
            base.remove(`users/user3/frequests/${index}`, 
                function(err) { 
                    if(err) { console.log(err);  }
                });
          }

        //   addRequest(e, name){
        //     e.preventDefault();
            
        //     base.push(`users/user3/friends/${name}`, {
        //         data: { name },
        //         then(err){
        //           if(!err) { 
        //               alert(`You're now friends with ${name}.`);
        //            }
        //         }
        //       });
        //   }
    }

export default Frequests;