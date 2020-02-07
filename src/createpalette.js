import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { SketchPicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./draggableColorList";
import arrayMove from "array-move";
import FormDialog from "./savePaletteForm";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  dividerHeading: {
    marginBottom: "3%",
    width: "100%",
    textAlign: "center",
    fontSize: "2.5em"
  },
  drawerButton: {
    marginBottom: "3%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-evenly"
  },
  colorPicker: {
    marginBottom: "3%",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  colorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    position: "relative",
    marginBottom: "-3px"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
    height: "100vh",
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  appBarBtns: {
    display: "flex",
    justifyContent: "flex-end",
    width: "60%",
    marginLeft: "auto",
    marginRight: "20px"
  },
  colorName: {
    position: "absolute",
    bottom: "0",
    left: "5px",
    fontSize: "0.7em"
  }
});
class CreatePalette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorName: "",
      open: true,
      colorChosen: { color: "blue" },
      colors: []
    };
    this.changeColor = this.changeColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      const a = this.state.colors.every(color => {
        return color.name.toLowerCase() !== value.toLowerCase();
      });
      return a;
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      const b = this.state.colors.every(color => {
        return color.color !== this.state.colorChosen.color;
      });
      return b;
    });
  }
  onSortEndFunc = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
  shouldCancelStart = e => {
    console.log(e.target);
    if (e.target.tagName.toLowerCase() === "path") return true;
  };
  handleClearBtn = () => {
    this.setState({
      colors: []
    });
  };
  handleRandomBtn = () => {
    var a = this.props.palettes.map(p => {
      return p.colors;
    });
    var rand = Math.floor(Math.random() * a.flat().length);
    this.setState({
      colors: [...this.state.colors, a.flat()[rand]]
    });
  };
  DeleteColor = (name, e) => {
    this.setState({
      colors: this.state.colors.filter(color => {
        return color.name !== name;
      })
    });
  };
  changeColor(color) {
    this.setState({
      colorChosen: { color: color.hex }
    });
  }
  addColorBoxes() {
    this.setState({
      colors: [
        ...this.state.colors,
        { ...this.state.colorChosen, name: this.state.colorName }
      ]
    });
  }
  handleChange(evt) {
    this.setState({
      colorName: evt.target.value
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleSubmit(name) {
    if (this.state.colors.length === 0) {
      console.log("cannot be null");
    } else {
      this.props.submit(this.state.colors, name);
      this.props.history.push("/");
    }
  }
  goBack() {
    this.props.history.push("/");
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="inherit"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create Your Palette
            </Typography>
            <div className={classes.appBarBtns}>
              <Button variant="contained" color="primary" onClick={this.goBack}>
                Go Back
              </Button>
              {this.state.open ? (
                <FormDialog
                  onSubmitForm={this.handleSubmit}
                  palettes={this.props.palettes}
                  colors={this.state.colors}
                />
              ) : (
                ""
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerRoot}>
            <div className={classes.dividerHeading}>Design Your Palette</div>
            <Divider />
            <div className={classes.drawerButton}>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.handleRandomBtn}
                disabled={this.state.colors.length >= 20}
              >
                {this.state.colors.length >= 20
                  ? "Palette Full"
                  : "Random Color"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClearBtn}
              >
                Clear Palette
              </Button>
            </div>
            <div className={classes.colorPicker}>
              <SketchPicker
                color={this.state.colorChosen.color}
                onChange={this.changeColor}
              />
            </div>
            <ValidatorForm onSubmit={this.addColorBoxes.bind(this)}>
              <TextValidator
                style={{ width: "100%", marginBottom: "20px" }}
                value={this.state.colorName}
                onChange={this.handleChange}
                validators={["required", "isColorNameUnique", "isColorUnique"]}
                errorMessages={[
                  "this field is required",
                  "Color Name should be unique",
                  "color should be unique"
                ]}
                label="Enter Color Name"
              />
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  backgroundColor: this.state.colorChosen.color,
                  fontWeight: "800"
                }}
                type="submit"
                disabled={this.state.colors.length >= 20}
              >
                {this.state.colors.length >= 20 ? "Palette Full" : "Add Color"}
              </Button>
            </ValidatorForm>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={this.state.colors}
            handleDelete={this.DeleteColor}
            axis="xy"
            onSortEnd={this.onSortEndFunc}
            shouldCancelStart={this.shouldCancelStart}
          />
        </main>
      </div>
    );
  }
}

CreatePalette.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CreatePalette);
