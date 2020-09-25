import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '75%',
  height: '75%'
};

export class GoogleMap extends Component {

    
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                {
                    lat: this.props.latitude,
                    lng: this.props.longitude
                }
                }
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCW5vzVRZlc7rOGI7VIOR1L98PzpVSNyGY")
  })(GoogleMap)