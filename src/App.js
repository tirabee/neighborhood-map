import React, { Component } from "react";
import Sidebar from "react-sidebar";
import MapContainer from "./MapContainer";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

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
  render() {
    return (
      <div className="App">
        <Sidebar
       sidebar={<b>Sidebar content</b>}
       open={this.state.sidebarOpen}
       onSetOpen={this.onSetSidebarOpen}
       styles={{ sidebar: { background: "white" } }}
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
