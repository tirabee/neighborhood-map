import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 40.409934,
          lng: -104.729065
        }}
      >
        <Marker
          name={"Woodbriar Park"}
          title={'Woodbriar Park'}
          position={{
            lat: 40.409934,
            lng: -104.729065
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAoGpvMXxTawpEiDCrR95JZBiWcc1eYZt0"
})(MapContainer);
