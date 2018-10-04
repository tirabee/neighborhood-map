import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const style = {
        width: '50vw',
        height: '100vh'
      }
    return (
      <div id="container">
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
          title={"Woodbriar Park"}
          position={{
            lat: 40.409934,
            lng: -104.729065
          }}
        />

        <Marker
          name={"Cottonwood Park"}
          title={"Cottonwood Park"}
          position={{
            lat: 40.410103,
            lng: -104.722238
          }}
        />
        <Marker
          name={"Sherwood Park"}
          title={"Sherwood Park"}
          position={{
            lat: 40.417494,
            lng: -104.726721
          }}
        />
        <Marker
          name={"Bittersweet Park"}
          title={"Bittersweet Park"}
          position={{
            lat: 40.415543,
            lng: -104.737295
          }}
        />

        <Marker
          name={"Sanborn Park"}
          title={"Sanborn Park"}
          position={{
            lat: 40.40491,
            lng: -104.728309
          }}
        />
        <Marker
          name={"Greeley West Park"}
          title={"Greeley West Park"}
          position={{
            lat: 40.401475,
            lng: -104.742564
          }}
        />
      </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAoGpvMXxTawpEiDCrR95JZBiWcc1eYZt0"
})(MapContainer);
