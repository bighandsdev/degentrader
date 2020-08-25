import React from "react";
import Iframe from "react-iframe";
import Popup from "reactjs-popup";
import axios from "axios";
import "./MoonPayPopup.css";

export default class MoonPayPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsOnMoonPay: this.props.coinsOnMoonPay,
      url: `https://buy.moonpay.io?apiKey=pk_live_M4RiDyjN7nnYeRFyBlwDBZzPNlkZHrjn&currencyCode=${this.props.symbol}&colorCode=%235B2639`,
    };
  }

  render() {
    console.log(this.props.symbol + "hehehe");
    if (this.state.coinsOnMoonPay.includes(this.props.coin.toLowerCase())) {
      return (
        <Popup
          contentStyle={{
            width: "400px",
            height: "400px",
            padding: "0px",
            borderRadius: "12px",
            boxShadow: `rgb(226, 207, 213) 1.5px 1.5px 3px,
            rgb(247, 242, 244) -3px -3px 6px -0.5px`,
            border: "none",
          }}
          trigger={
            <a className="btn-buy">
              {" "}
              Buy{" "}
              {this.props.coin.charAt(0).toUpperCase() +
                this.props.coin.slice(1)}{" "}
              💳
            </a>
          }
          position="top left"
        >
          <Iframe
            allow="accelerometer; autoplay; camera; gyroscope; payment"
            frameborder="0"
            height="100%"
            colorCode="%23F0E7EA"
            src={this.state.url}
            width="100%"
          >
            <p>Your browser does not support iframes.</p>
          </Iframe>
        </Popup>
      );
    } else {
      return <p></p>;
    }
  }
}
