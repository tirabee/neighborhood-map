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
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx, arr) => {
            return (
              <Marker
                tabIndex="1"
                position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}
                onClick={() => props.handleMarkerClick(marker)}
                title={marker.name}
                key={idx}
                animation={
                  marker.isOpen === true
                    ? window.google.maps.Animation.BOUNCE
                    : window.google.maps.Animation.DROP
                }
              >
                {marker.isOpen && (
                  <InfoWindow>
                    <div aria-label="Location Information">
                      <h1>{marker.name}</h1>
                      <h2>{marker.address}</h2>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAoGpvMXxTawpEiDCrR95JZBiWcc1eYZt0"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: ` 1000px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
