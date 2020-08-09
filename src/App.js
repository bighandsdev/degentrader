import React from "react";
import logo from "./logo.png";
import "./App.css";
import CustomizedTables from "./components/CustomizedTables.js";
import Cards from "./components/Cards.js";
import SearchBar from "./components/SearchBar.js";
import Chart from "./components/Chart.js";
import CurrencySettings from "./components/CurrencySettings.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      searchOn: false,
      value: "",
      isLoaded: false,
      coins: [],
      rawCoins: [],
      currencies: ["usd", "btc", "gbp"],
    };
    this.onChange = this.onChange.bind(this);
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
            rawCoins: result,
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

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({
        coins: this.state.rawCoins,
      });
    } else if (e.target.value !== "") {
      {
        let searcjQery = e.target.value.toLowerCase(),
          displayedCoins = this.state.coins.filter((el) => {
            let searchValue = el.id.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
          });
        this.setState({
          coins: displayedCoins,
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="row">
            <img src={logo} className="logo" />
          </div>

          <Cards />
          <div style={{ width: 500 }}></div>

          <div>
            <SearchBar inputValue={this.state.value} onChange={this.onChange} />
            <span>
              <CurrencySettings
                currencies={this.state.currencies}
                onClick={this.handleCurrencyClick}
              />
            </span>
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
