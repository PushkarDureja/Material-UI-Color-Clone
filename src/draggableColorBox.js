import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { SortableElement } from "react-sortable-hoc";
var styles = {
  colorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3px",
    "&:hover a ": {
      opacity: "1"
    }
  },
  colorName: {
    position: "absolute",
    bottom: "0",
    left: "5px",
    fontSize: "0.7em"
  },
  icon: {
    position: "absolute",
    right: "5px",
    bottom: "3px"
  },
  link: {
    color: "rgba(255,255,255,0.7)",
    opacity: "0",
    "&:hover": {
      color: "rgba(255,255,255,1)",
      transform: "scale(1.2)",
      transition: "all 0.8s",
      cursor: "pointer"
    }
  }
};
class DraggableColorBox extends Component {
  render() {
    var { classes } = this.props;
    return (
      <div
        className={classes.colorBox}
        style={{ backgroundColor: this.props.color }}
      >
        <span className={classes.colorName}>{this.props.name}</span>
        <span className={classes.icon}>
          <Link onClick={this.props.handleRemove} className={classes.link}>
            {" "}
            <i class="fas fa-trash" />
          </Link>
        </span>{" "}
      </div>
    );
  }
}
export default SortableElement(withStyles(styles)(DraggableColorBox));
