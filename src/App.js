import React, { Component } from "react";
import Sidebar from "react-sidebar";
import MapContainer from "./MapContainer";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import SquareAPI from "./api/";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount() {
    SquareAPI.search({
      near: "Austin, TX",
      query: "tacos",
      limit: 10
    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat:venue.location.lat,
          lng:venue.location.lng,
          isOpen: false,
          isVisible: true,
        }
      })
      this.setState({venues, center, markers});
    });
  }
  render() {
    return (
      <div className="App">
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "black" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
        <MapContainer />
      </div>
    );
  }
}

export default App;
