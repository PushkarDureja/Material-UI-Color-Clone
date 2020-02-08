import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import MiniPalette from "./miniPalettes";
import "./backgroundColor.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

var styles = {
  // root: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   height: "100vh",
  //   overflowY: "scroll",
  //   overflowX: "hidden"
  // },
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
  constructor(props) {
    super(props);
    this.state = {
      palettes: this.props.palettes
    };
  }
  deletePalette = name => {
    this.setState({
      palettes: this.state.palettes.filter(palette => {
        return palette.paletteName !== name;
      })
    });
  };
  handleClick = id => {
    this.props.history.push(`/palette/${id}`);
  };
  render() {
    console.log(this.state);
    var { classes } = this.props;
    const links = this.state.palettes.map(palette => {
      return (
        // <NavLink to={`/palette/${palette.id}`}>

        <MiniPalette
          paletteName={palette.paletteName}
          navLink={`/palette/${palette.id}`}
          {...palette}
          handleDelete={this.deletePalette}
          handleClick={this.handleClick}
        />

        // </NavLink>
      );
    });
    return (
      <div className="root">
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
