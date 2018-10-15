/*global google*/
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{
        lat: 40.409934,
        lng: -104.729065
      }}
    >
      {this.props.items.map(item => {
        return <Marker />;
      })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MapComponent

        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAoGpvMXxTawpEiDCrR95JZBiWcc1eYZt0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
