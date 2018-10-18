import React, { Component } from "react";

export default class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.items.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  handleChange = e => {
    this.setState({ query: e.target.value });

    const markers = this.props.items.map(venue => {
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
  };

  render() {
    return (
      <div className="sideBar">
        <h1>Nearby Pizza in Greeley, CO!</h1>
        <input
          role="search"
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
          onChange={this.handleChange}
        />
        <div>Items:</div>
        <ol>
          {this.props.items.map(item => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ol>
      </div>
    );
  }
}
