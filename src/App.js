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
      this.setState({ items: res.response.venues });
      console.log(this.state.items);
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
  addMarker = (marker) => {
    this.state.markers.push(marker)
  }
  render() {
    return (
      <div className="App" role="main">
        <Sidebar
          sidebar={<SidebarSearch items={this.state.items} />}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Map aria-label="Map" items={this.state.items} />
        </Sidebar>
      </div>
    );
  }
}

export default App;
