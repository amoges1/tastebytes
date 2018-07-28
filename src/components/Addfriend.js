import React, { Component } from 'react';

class Addfriend extends Component {
  render() {
    return (
        <div className="container" data-aos="fade-left"  data-aos-duration="1000">
            <form>
                <div className="form-group">
                    <label htmlFor="email"><strong>Add a Friend:</strong> </label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email address..." />
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-success" style={{borderRadius: "2px"}}>Send Request <i className="fas fa-user-plus"></i></button>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
  }
}

export default Addfriend;