import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import sizes from "./sizes";
var styles = {
  btn: {
    [sizes.down("md")]: {
      fontSize: "10px",
      padding: "7%",

      width: "100px"
    }
  }
};
class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      open: false
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      const a = this.props.palettes.every(palette => {
        return palette.paletteName.toLowerCase() !== value.toLowerCase();
      });
      return a;
    });
  }

  handleSubmitForm = () => {
    this.props.onSubmitForm(this.state.name);
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    var { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.btn}
          onClick={this.handleClickOpen}
          disabled={this.props.colors.length < 1}
        >
          Save Palette
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a Name for your beautiful palette.Make sure it is Unique
            </DialogContentText>
            <ValidatorForm onSubmit={this.handleSubmitForm}>
              <TextValidator
                value={this.state.name}
                onChange={this.handleNameChange}
                label="Palette Name"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "This field is required",
                  "Palette Name should be unique"
                ]}
              />
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </ValidatorForm>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of your Palette"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              fullWidth
            /> */}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FormDialog);
