import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./colorbox.css";
import { func } from "prop-types";
import sizes from "./sizes";
var styles = {
  root: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3px",
    [sizes.down("sm")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%"
    }
  }
};
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.handleOnCopy = this.handleOnCopy.bind(this);
  }

  handleOnCopy() {
    console.log("cpied true");

    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    var { classes } = this.props;
    return (
      <div
        className={`${classes.root} color-box`}
        style={{ backgroundColor: this.props.color }}
      >
        <div
          className={`copy-overlay ${this.state.copied && "show"}`}
          style={{ backgroundColor: this.props.color }}
        />
        <div className={`copy-overlay-content ${this.state.copied && "show"}`}>
          <h1 className="copy-overlay-msg">Copied</h1>
          <span className="copy-overlay-color">{this.props.color}</span>
        </div>
        <div className="box-content">
          <span className="color-title">{this.props.name}</span>
        </div>
        <CopyToClipboard text={this.props.color} onCopy={this.handleOnCopy}>
          <button className="copy">Copy</button>
        </CopyToClipboard>
        <button className="more">More</button>
      </div>
    );
  }
}

export default withStyles(styles)(ColorBox);
