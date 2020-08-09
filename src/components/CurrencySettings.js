import React from "react";
import "./CurrencySettings.css";

export default class CurrencySettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: this.props.currencies,
    };
  }

  render() {
    const { currencies } = this.state;
    return (
      <div class="dropdown">
        <button class="dropbtn">💵</button>
        <div class="dropdown-content">
          {currencies.map((currency) => (
            <a
              data-item={currency}
              onClick={this.props.onClick}
              value={this.props.inputValue}
            >
              {currency.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
