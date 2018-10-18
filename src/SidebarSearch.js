import React, { Component } from "react";

export default class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      items: []
    };
  }

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
        <h1>Nearby Pizza in Greeley, CO!</h1>
        <input
          role="search"
          type={"search"}
          id={"search"}
          placeholder={"Filter Venues"}
          onChange={this.handleChange}
        />
        <div>Items:</div>
        <ul venues={this.handleFilterVenues()}>
          {this.props.items &&
            this.props.items.map(item => (
              <li
                onClick={() => this.props.handleListItemClick(this.props)}
                key={item.id}
              >
                {item.name} \\ {item.hereNow.count}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
