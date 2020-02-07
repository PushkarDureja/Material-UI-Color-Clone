import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MiniPalette from "./miniPalettes";
import seedColors from "./seedColors";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
var styles = {
  root: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    height: "100vh",
    overflowY: "scroll",
    overflowX: "hidden",
    backgroundImage:
      "linear-gradient(to right bottom, #7539c4, #6d4ad0, #6458db, #5b65e5, #5072ee, #3286f7, #1099fd, #0caaff, #49c4fb, #82daf6, #b9eef5, #eefffe)"
  },
  header: {
    position: "sticky",
    top: "0",
    zIndex: "10",
    display: "flex",
    justifyContent: "space-around",
    fontSize: "2em",
    fontFamily: "'PT Sans', sans-serif",
    color: "white",
    width: "100%",
    margin: "0.5%",
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  content: {
    marginLeft: "-5%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "10%"
  },
  headerTitle: {
    textAlign: "center",
    textShadow: "4px 2px 4px rgba(79,73,79,1)"
  },
  Link: {
    fontSize: "1rem",
    display: "flex",
    alignItems: "center"
  }
};
class Home extends Component {
  render() {
    var { classes } = this.props;
    const links = this.props.palettes.map(palette => {
      return (
        <NavLink to={`/palette/${palette.id}`}>
          <MiniPalette
            paletteName={palette.paletteName}
            navLink={`/palette/${palette.id}`}
            {...palette}
          />
        </NavLink>
      );
    });
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>React Colors</div>

          <Link to="/create" className={classes.Link}>
            Create New Palette
          </Link>
        </div>
        <div className={classes.content}>{links}</div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
