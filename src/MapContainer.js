/*global google*/
import React, { Component } from "react";
import foursquare from "react-foursquare";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap((props => (
    <GoogleMap
      zoom={props.zoom}
      defaultCenter={{
        lat: 40.409934,
        lng: -104.729065
      }}
    >
  {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
  ))


export default class Map extends Component {
  render() {
    const markers = this.props.markers || [];
    return (
      <MapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAoGpvMXxTawpEiDCrR95JZBiWcc1eYZt0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div className="mapContainer" style={{ height: `100%` }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
