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
      coinsForCard: [],
      rawCoins: [],
      currencies: [
        "usd",
        "eur",
        "rub",
        "idr",
        "krw",
        "cny",
        "gbp",
        "aud",
        "cad",
      ],
      settings: ["All", "Defi"],
      settingsAPIParam: {
        All: "all",
        Defi: "decentralized_finance_defi",
      },
      currencySymbols: {
        USD: "$", // US Dollar
        EUR: "€", // Euro
        CRC: "₡", // Costa Rican Colón
        GBP: "£", // British Pound Sterling
        ILS: "₪", // Israeli New Sheqel
        INR: "₹", // Indian Rupee
        JPY: "¥", // Japanese Yen
        KRW: "₩", // South Korean Won
        NGN: "₦", // Nigerian Naira
        PHP: "₱", // Philippine Peso
        PLN: "zł", // Polish Zloty
        PYG: "₲", // Paraguayan Guarani
        THB: "฿", // Thai Baht
        AUD: "$",
        CAD: "$",
      },
      currency: "usd",
      currencySymbol: "$",
      dataSettings: "all",
      pageNumber: 1,
      pageSettings: [0, 100],
    };
    this.onChange = this.onChange.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const currencyR = this.state.currency;
    const settings = this.state.settingsAPIParam[this.state.dataSettings];
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyR}&category=${settings}&order=market_cap_desc&per_page=350&page=1&sparkline=false`
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
  updateData(currency, settingsAllorDefi) {
    const currencyR = currency;
    const settingsAllorDefiR = settingsAllorDefi;
    console.log(settingsAllorDefi);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyR}&category=${settingsAllorDefiR}&order=market_cap_desc&per_page=350&page=1&sparkline=false`
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
    } else if (e.target.value.length < this.state.value.length) {
      {
        let searcjQery = e.target.value.toLowerCase(),
          displayedCoins = this.state.coins.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
          });
        this.setState({
          coins: this.state.rawCoins,
        });
      }
    } else if (e.target.value !== this.state.value) {
      {
        let searcjQery = e.target.value.toLowerCase(),
          displayedCoins = this.state.coins.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
          });
        this.setState({
          coins: displayedCoins,
        });
      }
    }
  }

  handleCurrencyClick(e) {
    this.setState({
      currency: e.currentTarget.getAttribute("data-item"),
    });
    return this.updateData(
      e.currentTarget.getAttribute("data-item"),
      this.state.dataSettings
    );
  }
  handleSettingsClick(e) {
    this.setState({
      dataSettings: this.state.settingsAPIParam[
        e.currentTarget.getAttribute("data-item")
      ],
      pageNumber: 1,
      pageSettings: [0, 100],
    });
    return this.updateData(
      this.state.currency,
      this.state.settingsAPIParam[e.currentTarget.getAttribute("data-item")]
    );
  }
  handlePageChange(e) {
    console.log("lol");
    if (e === "up") {
      const number = this.state.pageSettings.map(function (value) {
        return value + 100;
      });
      this.setState({
        pageNumber: this.state.pageNumber + 1,
        pageSettings: number,
      });
    } else if (e === "down") {
      const number = this.state.pageSettings.map(function (value) {
        return value - 100;
      });
      this.setState({
        pageNumber: this.state.pageNumber - 1,
        pageSettings: number,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="row">
            <h1 className="brain">🧠</h1>

            <h1 classname="logo-text">DegenTrader</h1>
          </div>
        </header>
        <body className="App-body">
          <Cards
            currency={this.state.currency}
            currency_symbols={this.state.currencySymbols}
            data={this.state}
          />
          <div style={{ width: 500 }}></div>

          <div>
            <SearchBar inputValue={this.state.value} onChange={this.onChange} />
            <span>
              <CurrencySettings
                currencies={this.state.currencies}
                settings={this.handleSettingsClick}
                settingsOptions={this.state.settings}
                onClick={this.handleCurrencyClick}
                inputValue={this.state.currency}
              />
            </span>
          </div>

          <div>
            <CustomizedTables
              coins={this.state}
              currency={this.state.currency}
              currency_symbols={this.state.currencySymbols}
              settings={this.state.settingsData}
              pageNumber={this.state.pageNumber}
              pageSettings={this.state.pageSettings}
              onClick={this.handlePageChange}
            />
          </div>

          <div></div>
        </body>
        <footer className="App-footer">
          <div className="donate">
            <p className="footer-title">
              Bitcoin: bc1qvu59mxfplh8cq4a0h5tzjxken3rszegja4828k
            </p>

            <p className="footer-title">
              Ethereum: 0x413ED157A79f9197E2fcc6aF89EF89e7Da00e5F2
            </p>
            <p className="footer-title">
              Bitcoin Cash: 1AYaDCDGfSgKqQzZQxhazzcbAPQMSkB9H8
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
