import React from "react";
import "./pageSettings.css";
export default class PageSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.pageNumber,
    };
  }

  handlePageHandsDown() {
    if (this.props.pageNumber > 1) {
      return (
        <a
          className="page-button"
          onClick={() => {
            this.props.onClick("down");
          }}
        >
          👈
        </a>
      );
    } else {
      return <a></a>;
    }
  }
  handlePageHandsup() {
    if (this.props.pageNumber < 3) {
      return (
        <a
          className="page-button"
          onClick={() => {
            this.props.onClick("up");
          }}
        >
          👉
        </a>
      );
    } else {
      return <a></a>;
    }
  }

  render() {
    const { pageNumber } = this.props;
    return (
      <td colspan="8">
        <div class="container">
          {this.handlePageHandsDown()}
          <br />
          <p> Page {this.props.pageNumber} </p>
          <br />
          {this.handlePageHandsup()}
        </div>
      </td>
    );
  }
}
