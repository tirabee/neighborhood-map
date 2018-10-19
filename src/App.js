/*global google*/
import React, { Component } from "react";
import Map from "./MapContainer";
import { slide as Menu } from "react-burger-menu";
import SidebarSearch from "./SidebarSearch";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

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
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  // Pulls info from Foursquare API
  componentDidMount() {
    foursquare.venues
      .getVenues(params)
      .then(res => {
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
      })
      .catch(error => {
        window.alert("Error getting data from FourSquare. " + error.message);
        console.log(error);
      });
  }
  // Credit to Forrest Walker for these handler functions! https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP
  // Closes All Open Markers
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
    item.animation = 1;
    marker.animation = 1;
    foursquare.venues.getVenues(params).then(res => {
      const newVenue = Object.assign(item, res.response.venue);
      this.setState({ items: Object.assign(this.state.items, newVenue) });
    });
  };
  //Shows marker of item clicked on the list of locations.
  handleListItemClick = item => {
    const marker = this.state.markers.find(marker => marker.id === item.id);
    this.handleMarkerClick(marker);
    console.log(marker);
  };

  render() {
    return (
      <div className="App" role="main">
        <ErrorBoundary>
          <Menu width={"300"}>
            <SidebarSearch
              {...this.state}
              handleListItemClick={this.handleListItemClick}
            />
          </Menu>

          <Map
            aria-label="Map"
            {...this.state}
            handleMarkerClick={this.handleMarkerClick}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
