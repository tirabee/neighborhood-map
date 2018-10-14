import React, { Component } from "react";
import Map from "./MapContainer";
import SquareAPI from "./api/";
import Sidebar from "react-sidebar";
import SidebarSearch from "./SidebarSearch";

import "./App.css";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 13,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
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
  };
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
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <div className="App" role="main">
        <Sidebar
          sidebar={<SidebarSearch />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Map
            {...this.state}
            handleMarkerClick={this.handleMarkerClick}
            aria-label="Map"
          />
        </Sidebar>
      </div>
    );
  }
}

export default App;
