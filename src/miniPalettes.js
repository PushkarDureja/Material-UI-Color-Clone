import React, { Component } from "react";

import { withStyles } from "@material-ui/styles";
var styles = {
  root: {
    border: "1px solid rgba(255,255,255,0.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "5%",
    width: "200px",
    height: "150px",
    borderRadius: "7%",
    backgroundColor: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    boxShadow: "6px 6px 12px -2px  rgba(79,73,79,1)"
  },
  colorBox: {
    border: "1px solid rgba(255,255,255,0.8)",
    width: "90%",
    height: "80%",
    margin: "3% 0",
    borderRadius: "6%"
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    width: "90%",
    height: "20%",
    textAlign: "center",
    alignItems: "center"
  },
  img: {
    width: "100%",
    height: "100%"
  },
  contentHeading: {
    fontSize: "0.8em",
    color: "black",
    fontWeight: "800"
  },
  color: {
    width: "20%",
    height: "24.5%",
    display: "inline-block",
    marginBottom: "-3px"
  }
};
class MiniPalette extends Component {
  render() {
    var { classes, paletteName } = this.props;
    var individualBox = this.props.colors.map(color => {
      return (
        <div
          style={{ backgroundColor: color.color }}
          className={classes.color}
        />
      );
    });
    return (
      <div className={classes.root}>
        <div className={classes.colorBox}>
          <div className={classes.img}>{individualBox}</div>
        </div>
        <div className={classes.content}>
          <div className={classes.contentHeading}>{paletteName}</div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);
