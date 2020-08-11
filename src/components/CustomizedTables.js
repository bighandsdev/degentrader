import React from "react";
import "./CustomizedTables.css";
import Chart from "./Chart.js";

export default class CustomizedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinClicked: "",
      chartDays: 30,
      redraw: false,
      currency: this.props.currency,
      currency_symbols: this.props.currency_symbols,
      button_color: "white",
    };
    this.dateClick = this.dateClick.bind(this);
  }
  handleUporDown(coinChange) {
    if (coinChange > 0) {
      return "up";
    } else if (coinChange < -10) {
      return "fuck";
    } else {
      return "down";
    }
  }
  handleEmoji(coinChange) {
    if (coinChange < -10) {
      return <span>💀</span>;
    } else if (coinChange < 0) {
      return <span>😕</span>;
    } else if (coinChange < 10) {
      return <span>😃</span>;
    } else if (coinChange < 20) {
      return <span>🚀</span>;
    } else if (coinChange > 20) {
      return <span>🤯</span>;
    }
  }

  roundDown(number, decimals) {
    decimals = decimals || 0;
    return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  handleClick(e) {
    const coin = e.currentTarget.getAttribute("data-item");
    this.setState({
      coinClicked: coin,
    });
    console.log("We need to get the details for " + coin);
  }

  dateClick(e) {
    const dayRequest = e.currentTarget.getAttribute("data-item");
    this.setState({
      chartDays: dayRequest,
    });
  }

  chartRender(coin, days) {
    const { error, isLoaded, coins } = this.props.coins;
    if (coin === this.state.coinClicked) {
      return (
        <tr>
          <td></td>

          <td>
            <div class="container">
              <a
                className="btn btn-1"
                key="1-days"
                data-item={1}
                onClick={this.dateClick}
                id={coin}
              >
                Past day
              </a>
              <a
                className="btn btn-2"
                key="7-days"
                data-item={7}
                onClick={this.dateClick}
                id={coin}
              >
                Past week
              </a>
              <a
                className="btn btn-3"
                key="30-days"
                data-item={30}
                onClick={this.dateClick}
                id={coin}
              >
                Past month
              </a>
              <a
                class="btn btn-4"
                key="365-days"
                data-item={365}
                onClick={this.dateClick}
                id={coin}
              >
                Past year
              </a>
            </div>
            <Chart
              id={coin}
              days={days}
              redraw={this.state.redraw}
              currency={this.props.currency}
            />
          </td>

          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    } else {
    }
  }

  result() {
    const { error, isLoaded, coins } = this.props.coins;
    if (coins.length > 0) {
      return coins.map((coin) => (
        <>
          <tr
            key={coin.id}
            data-item={coin.id}
            onClick={this.handleClick.bind(this)}
          >
            <td>{coin.market_cap_rank}</td>
            <td className="theCoinId">
              <img src={coin.image} className="Coin-Logo" />

              {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}

              <span className="symbol">{coin.symbol.toUpperCase()}</span>
              <td></td>
            </td>
            <td>
              {this.props.currency_symbols[this.props.currency.toUpperCase()]}
              {this.roundDown(coin.current_price, 2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            <td
              className={this.handleUporDown(coin.price_change_percentage_24h)}
            >
              {this.roundDown(coin.price_change_percentage_24h, 2)}%
            </td>
            <td>
              {this.state.currency_symbols[this.props.currency.toUpperCase()]}
              {coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
            <td className="emoji">
              {this.handleEmoji(coin.price_change_percentage_24h)}
            </td>
          </tr>
          {this.chartRender(coin.id, this.state.chartDays)}
        </>
      ));
    } else {
      return <p>No results 😕</p>;
    }
  }
  render() {
    const { error, isLoaded, coins } = this.props.coins;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24 Hour Change</th>
            <th>MarketCap</th>
          </tr>
          {this.result()}
        </table>
      );
    }
  }
}
