import React, { Component } from 'react';

class Map extends Component {
  render() {
    return (
        <div className="modal fade" id="map">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header" style={{backgroundColor: "#ffc107"}}>
                    <h5 className="modal-title">Hello</h5>
                    <button type="button" className="close" data-dismiss="modal" 
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div id="map"></div>
                  
                                       
                                        {/* <script async defer
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ1bLPjeXDxr6u-2G6lE0NvpaPCWkcmBw&callback=initMap">
            </script>     */}
                </div> 
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" 
                    data-dismiss="modal">Done</button>
                </div> 
            </div> 
        </div> 
    </div> 
    );
  }
}

export default Map;
