import React, { Component } from "react";
import List from "./List";

export default class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  //filters venues using the search input
  // credit to Forrest Walker for these filtering methods. https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const items = this.props.items.filter(item =>
        item.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return items;
    }
    return this.props.items;
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.items.map(item => {
      const isMatched = item.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === item.id);
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
      <div className="sideBar">
        <h1 className="heading">Nearby Pizza in Greeley, CO!</h1>
        <h2 className="heading">Location data by Foursquare</h2>
        <input
          role="search"
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
          onChange={this.handleChange}
        />
        <List
          {...this.props}
          items={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
