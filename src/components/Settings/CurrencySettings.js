import React from "react";
import "./CurrencySettings.css";

export default class CurrencySettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: this.props.currencies,
      settingsOptions: this.props.settingsOptions,
    };
  }

  render() {
    let width = window.innerWidth;
    const { currencies, settingsOptions } = this.state;
    if (width > 768) {
      return (
        <span className="settings">
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
          <div class="dropdown">
            <button class="dropbtn">⚙️</button>
            <div class="dropdown-content">
              {settingsOptions.map((setting) => (
                <a
                  data-item={setting}
                  onClick={this.props.settings}
                  value={this.props.inputValue}
                >
                  {setting}
                </a>
              ))}
            </div>
          </div>
        </span>
      );
    } else {
      return (
        <div className="settings">
          <div class="dropdown">
            <button class="dropbtn1">💵</button>
            <div class="dropdown-content" id="dropdown-content-1">
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
          <div class="dropdown">
            <button class="dropbtn2">⚙️</button>
            <div class="dropdown-content" id="dropdown-content-2">
              {settingsOptions.map((setting) => (
                <a
                  data-item={setting}
                  onClick={this.props.settings}
                  value={this.props.inputValue}
                >
                  {setting}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}
