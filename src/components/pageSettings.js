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
    const { pageNumber } = this.props;
    const currentPage = pageNumber;
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

  render() {
    const { pageNumber } = this.props;
    return (
      <td colspan="7">
        <div class="container">
          <a
            className="page-button"
            onClick={() => {
              this.props.onClick("down");
            }}
          >
            👈
          </a>
          <br />
          <p> Page {this.props.pageNumber} </p>
          <br />
          <a
            className="page-button"
            onClick={() => {
              this.props.onClick("up");
            }}
          >
            👉
          </a>
        </div>
      </td>
    );
  }
}
