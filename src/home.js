import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import MiniPalette from "./miniPalettes";
import "./backgroundColor.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
      palettes: this.props.palettes,
      open: false
    };
  }
  deletePrompt = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
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
          deletePrompt={this.deletePrompt}
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
