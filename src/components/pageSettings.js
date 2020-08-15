import React from "react";
import "./pageSettings.css";
export default class PageSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  handlePageHands() {
    const currentPage = this.state.currentPage;
    if (currentPage > 1) {
      return (
        <a className="page-button" onClick="...">
          👈
        </a>
      );
    } else {
    }
  }

  render() {
    return (
      <td colspan="7">
        <div class="container">
          {this.handlePagehands}
          <br />
          <p> Page {this.state.currentPage} </p>
          <br />
          <a className="page-button" onClick="...">
            👉
          </a>
        </div>
      </td>
    );
  }
}
