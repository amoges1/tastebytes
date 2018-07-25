import React, { Component } from 'react';

class Frequests extends Component {
  render() {
    const freqs = this.props.freqs;
    return (
        <li className="list-group-item list-group-item-action "> 
            <h5  className="mb-0 d-flex justify-content-between">{freqs}
                <div className="btn-group">
                    <button type="button" className="btn btn-success btn-sm">
                        Accept <i className="far fa-check-circle"></i>
                    </button>
                    <button type="button" className="btn btn-danger btn-sm"> 
                        Decline <i className="far fa-times-circle"></i>
                    </button>
                </div>
            </h5>
        </li>
    );
  }
}

export default Frequests;