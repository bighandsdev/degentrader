import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="wrapper">
        <p className="glass">🔎</p>
        <input
          className="search"
          placeholder="Search Coin"
          type="text"
          onChange={this.props.onChange}
          value={this.props.inputValue}
        />
      </div>
    );
  }
}
export default SearchBar;
