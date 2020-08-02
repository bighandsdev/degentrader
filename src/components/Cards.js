import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Cards.css';

export default class CustomizedTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      coins: [],
    };
  }

  componentDidMount() {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false',
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
  handleUporDown(coinChange) {
    if (coinChange > 0) {
      return 'Card-up';
    } else {
      return 'Card-down';
    }
  }
  roundDown(number, decimals) {
    decimals = decimals || 0;
    return (
      Math.floor(number * Math.pow(10, decimals)) /
      Math.pow(10, decimals)
    );
  }

  render() {
    const { error, isLoaded, coins } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div class="row">
          <div class="column">
            {coins.map((coin) => (
              <div
                class={this.handleUporDown(
                  coin.price_change_percentage_24h,
                )}
              >
                <p className="card-text">
                  <img className="image" src={coin.image} />
                  {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}
                </p>
                <p className="card-price">${coin.current_price} </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
