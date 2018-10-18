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
        props.items
        .map(item => {
          return (
            <Marker
              position={{
                lat: item.location.lat,
                lng: item.location.lng
              }}
              onClick={() => props.handleMarkerClick(item)}
              title={item.name}
              key={item.id}
            >
              {props.isOpen && (
                <InfoWindow>
                  <div>
                    <h1>{item.name}</h1>
                    <h2>{item.location.address}</h2>
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
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
