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
  constructor() {
    super();
    this.state = {
      items: [],
      zoom: 13,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      markers: []
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  componentDidMount() {
    foursquare.venues.getVenues(params).then(res => {
      const markers = this.state.items.map(item => {
        return {
          lat: this.state.items.location.lat,
          lng: this.state.items.location.lng,
          title: this.state.item.name,
          isOpen: false,
          isVisible: true,
          id: this.state.items.id
        };
      });
      this.setState({
        items: res.response.venues,
        markers: res.response.venues
      });
    });
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
  };
  render() {
    return (
      <div className="App" role="main">
        <Sidebar
          sidebar={<SidebarSearch items={this.state.items} />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Map aria-label="Map" items={this.state.items} markers={this.state.markers} />
        </Sidebar>
      </div>
    );
  }
}

export default App;
