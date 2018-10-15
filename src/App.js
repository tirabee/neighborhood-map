import React, { Component } from "react";
import Map from "./MapContainer";
import Sidebar from "react-sidebar";
import SidebarSearch from "./SidebarSearch";

import "./App.css";

const mql = window.matchMedia(`(min-width: 800px)`);


class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      zoom: 13,
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
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
