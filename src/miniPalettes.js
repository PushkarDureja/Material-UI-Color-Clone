import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
var styles = {
  root: {
    position: "relative",
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
    boxShadow: "6px 6px 12px -2px  rgba(79,73,79,1)",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1"
    }
  },
  colorBox: {
    border: "1px solid rgba(255,255,255,0.8)",
    width: "90%",
    height: "80%",
    margin: "3% 0",
    borderRadius: "6%"
  },
  content: {
    // display: "flex",
    // justifyContent: "space-around",
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
  },
  deletebtn: {
    position: "absolute",
    zIndex: "10",
    right: "10px",
    top: "4px",
    width: "100%",
    height: "100%",
    "&:hover a": {
      opacity: "1",

      cursor: "pointer"
    }
  },
  link: {
    transition: "all 0.3s",
    color: "rgba(255, 29, 13,1)",
    opacity: "0",
    float: "right",
    "&:hover": {
      transform: "scale(1.2)"
    }
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
      <div
        className={classes.root}
        onClick={() => this.props.handleClick(this.props.id)}
      >
        <span className={classes.deletebtn}>
          <Link
            className={classes.link}
            onClick={e => {
              e.stopPropagation();
              this.props.deletePrompt(paletteName);
            }}
          >
            <i class="fas fa-trash" />
          </Link>
        </span>
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
