import React from "react";
import logo from "./logo.png";
import "./App.css";
import CustomizedTables from "./components/CustomizedTables.js";
import Cards from "./components/Cards.js";
import SearchBar from "./components/SearchBar.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchOn: false,
      search: "",
      isLoaded: false,
      coins: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            coins: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  handleChange(e) {
    let currentList = [];
    let newList = [];
    if (e !== "") {
      currentList = this.state.coins;

      newList = currentList.filter((coin) => {
        const lc = coin.toString().toLowerCase();
        const filter = e.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.coins;
    }
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
