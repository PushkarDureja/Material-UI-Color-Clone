import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      open: false
    };
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
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
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
            <ValidatorForm>
              <TextValidator
                value={this.state.name}
                onChange={this.handleNameChange}
                label="Palette Name"
              />
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
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitForm} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default FormDialog;
