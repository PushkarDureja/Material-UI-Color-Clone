import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { NavLink } from "react-router-dom";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./navbar.css";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex"
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  changeLevel(level) {
    this.props.onChange(level);
  }
  onSelectChange(e) {
    this.setState({ format: e.target.value }, () => {
      this.props.changeFormat(this.state.format);
    });
  }
  render() {
    return (
      <div className="navbar-content">
        <NavLink className="title" to="/">
          React Color App
        </NavLink>
        <div className="level">
          <span>Level:{this.props.colorLevel}</span>
        </div>

        <Slider
          className="slider"
          min={100}
          max={900}
          step={100}
          onChange={this.changeLevel}
          defaultValue={500}
        />
        <div className="select">
          <Select onChange={this.onSelectChange} value={this.state.format}>
            <MenuItem value="hex">hex</MenuItem>
            <MenuItem value="rgb">rgb</MenuItem>
            <MenuItem value="rgba">rgba</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}
export default Navbar;
