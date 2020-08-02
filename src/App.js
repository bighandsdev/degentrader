import React from 'react';
import logo from './logo.png';
import './App.css';
import CustomizedTables from './components/CustomizedTables.js';
import Cards from './components/Cards.js';
import SearchBar from './components/SearchBar.js';

//#region
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchOn: false,
      search: '',
      isLoaded: false,
      coins: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            coins: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }
  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e !== '') {
      // Assign the original list to currentList
      currentList = this.state.coins;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((coin) => {
        // change current item to lowercase
        const lc = coin.toString().toLowerCase();
        // change search term to lowercase
        const filter = e.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.coins;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      coins: newList,
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="row">
            <img src={logo} className="logo" />
          </div>
          <p>{this.state.search}</p>
          <Cards />

          <div>
            <SearchBar handleChange={this.handleChange} />
          </div>

          <div>
            <CustomizedTables coins={this.state} />
          </div>

          <div></div>
        </header>
      </div>
    );
  }
}

export default App;
