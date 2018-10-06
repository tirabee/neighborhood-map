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
  handleMarkerClick = marker => {
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
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
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;
