import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    const searched = e.target.value;
    this.props.handleChange(searched);
  }
  render() {
    return (
      <div class="wrapper">
        <p className="glass">🔎</p>
        <input
          class="search"
          placeholder="Search Coin"
          type="text"
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default SearchBar;
