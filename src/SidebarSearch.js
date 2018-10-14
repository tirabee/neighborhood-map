import React, { Component } from "react";
import VenueList from "./VenueList";

export default class SidebarSearch extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: [],
      sidebarOpen: true,
    };

  }
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  handleChange = e => {
    this.setState({ query: e.target.value });

    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };
  render() {
    return (
      <div className="sideBarSearch">
        <h1>Nearby Pizza in Greeley, CO!</h1>
        <input role="search" type={"search"} id={"search"} placeholder={"Filter Venues"} onChange={this.handleChange}/>
        <VenueList
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
