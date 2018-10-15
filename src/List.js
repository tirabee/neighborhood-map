import React, {Component} from "react";

export default class List extends Component {
  render() {
    return(
      <div>
              <div>Items:</div>
              { this.state.items.map(item=> { return <div key={item.id}>{item.name}</div>}) }
          </div>

)
  }
}
