import React, { Component } from "react";
import Map from "./MapContainer";
import SquareAPI from "./api/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 13
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
      const newVenue = Object.assign(res.response.venue, venue);
      this.setState({ venues: this.state.venue, newVenue });
    });
  };
  componentDidMount() {
    SquareAPI.search({
      near: "Greeley, CO",
      query: "Park",
      limit: 20
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
      console.log(results);
      this.setState({ venues, center, markers });
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;
