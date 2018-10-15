import React, { Component } from "react";
var foursquare = require("react-foursquare")({
  clientID: "YXOHYK4SXRTDPPFVU5AGRE3OS2P5IPQTCLCXSXTHKTCHFYRW",
  clientSecret: "YMSLLPRSPAHAAPMJB1FDBF5LQXUMXK0BEOFPKQFPCZHPJZN4"
});
var params = {
  ll: "40.409934,-104.729065",
  query: "Pizza"
};


export default class SidebarSearch extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      sidebarOpen: true,
      items: []
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

  };
  componentDidMount() {
    foursquare.venues.getVenues(params).then(res => {
      this.setState({ items: res.response.venues });
    });
    console.log(this.state.items);
  }
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
        <ol>  { this.state.items.map(item=> { return <li key={item.id}>{item.name}</li>}) }</ol>


      </div>
    );
  }
}
