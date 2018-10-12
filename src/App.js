import React, { Component } from "react";
import Map from "./MapContainer";
import SquareAPI from "./api/";
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button/Button';

import './App.css';
import ErrorBoundary from "./ErrorBoundary";
class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 13,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }


  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });

    });
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  }
  componentDidMount() {
    SquareAPI.search({
      near: "Greeley, CO",
      query: "Pizza",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
    });
  }

  handleToggle = () => {
  this.setState({active: !this.state.active});
};

  render() {
    return (
      <div className="App" role="main">


        <Button label='Show Drawer' raised accent onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>


        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} aria-label="Map" />
      </div>
    );
  }
}

export default App;
