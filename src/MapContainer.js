import React, { Component } from "react";
import SquareAPI from "./api/";

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
      zoom={props.zoom}
      defaultCenter={{
        lat: 40.409934,
        lng: -104.729065
      }}
    >
      {props.markers &&
        props.markers.filter(marker => marker.isVisible).map((marker, idx) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
            >
              {marker.isOpen && venueInfo.bestPhoto && (
                <InfoWindow>
                  <React.Fragment>
                    <img src={`${venueInfo.bestPhoto.prefix}200x200{venueInfo.bestPhoto.suffix}`} alt="Venue Photo" />
                  <p>{venueInfo.name}</p>
                  </React.Fragment>
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
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
