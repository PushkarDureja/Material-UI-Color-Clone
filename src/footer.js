import React, { Component } from "react";
import "./footer.css";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-title">{this.props.paletteName}</div>
      </div>
    );
  }
}
export default Footer;
