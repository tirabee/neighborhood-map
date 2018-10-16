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
      {props.items &&
        props.items.filter(marker => marker.isVisible).map(marker => {
          const itemInfo = props.items.find(item => item.id === marker.id);
          return (
            <Marker
              position={{
                lat: props.items.location.lat,
                lng: props.items.location.lng
              }}
              title={props.items.name}
              key={props.items.id}
            />
          );
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
