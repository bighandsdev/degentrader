import React from "react";
import Iframe from "react-iframe";
import Popup from "reactjs-popup";

export default class MoonPayPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popup
        contentStyle={{ width: "400px", height: "400px" }}
        trigger={<button> Buy {this.props.coin}</button>}
        position="top left"
      >
        <Iframe
          style={{ borderRadius: "5px" }}
          allow="accelerometer; autoplay; camera; gyroscope; payment"
          frameborder="0"
          height="100%"
          src="https://buy-staging.moonpay.io?apiKey=pk_test_123"
          width="100%"
        >
          <p>Your browser does not support iframes.</p>
        </Iframe>
      </Popup>
    );
  }
}
