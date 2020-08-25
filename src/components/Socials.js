import React from "react";
import axios from "axios";

export default class Socials extends React.Component {
  constructor() {
    super(props);
    this.state = {
      reddit: "",
      site: "",
    };
    this.handleSocials = this.handleSocials.bind(this);
  }
  componentDidMount() {
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

  handleSocials() {
    if (this.state.reddit !== "") {
      return (
        <a href={this.state.reddit}>
          <img src="src/img/reddit (1).png" />
        </a>
      );
    }
    if (this.state.site !== "") {
      return (
        <a href={this.state.site}>
          <img src="src/img/www.png" />
        </a>
      );
    }
  }

  render() {
    return <div>{this.handleSocials}</div>;
  }
}
