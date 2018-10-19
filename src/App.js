import React, { Component } from "react";
import Map from "./MapContainer";
import Sidebar from "react-sidebar";
import SidebarSearch from "./SidebarSearch";

import "./App.css";

const mql = window.matchMedia(`(min-width: 800px)`);
var foursquare = require("react-foursquare")({
  clientID: "YXOHYK4SXRTDPPFVU5AGRE3OS2P5IPQTCLCXSXTHKTCHFYRW",
  clientSecret: "YMSLLPRSPAHAAPMJB1FDBF5LQXUMXK0BEOFPKQFPCZHPJZN4"
});
var params = {
  ll: "40.409934,-104.729065",
  query: "Pizza"
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      markers: [],
      zoom: 13,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  componentDidMount() {
    foursquare.venues.getVenues(params).then(res => {
      const markers = res.response.venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          title: venue.name,
          isOpen: false,
          isVisible: true,
          id: venue.id,
          name: venue.name,
          address: venue.location.address
        };
      });
      this.setState({ items: res.response.venues, markers });
    });
  }
  ComponentWillMount() {
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
    const item = this.state.items.find(item => item.id === marker.id);

    foursquare.venues.getVenues(params).then(res => {
      const newVenue = Object.assign(item, res.response.venue);
      this.setState({ items: Object.assign(this.state.items, newVenue) });
      console.log(newVenue);
    });
  };

  handleListItemClick = item => {
    const marker = this.state.markers.find(marker => marker.id === item.id);
    this.handleMarkerClick(marker);
  };

  render() {
    return (
      <div className="App" role="main">
        <Sidebar
          sidebar={
            <SidebarSearch
              {...this.state}
              handleListItemClick={this.handleListItemClick}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Map
            aria-label="Map"
            {...this.state}
            handleMarkerClick={this.handleMarkerClick}
          />
        </Sidebar>
      </div>
    );
  }
}

export default App;
