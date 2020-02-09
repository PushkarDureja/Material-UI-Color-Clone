import React, { Component } from "react";
// import seedColors from "./seedColors";
import Footer from "./footer";

import Navbar from "./navbar";
import ColorBox from "./colorbox";
import "./palette.css";
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
      isChangingFormat: false
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    // this.displayChangeFormatPage = this.displayChangeFormatPage.bind(this);
  }
  changeLevel(level) {
    this.setState({ level: level });
  }
  onSelectChange(val) {
    this.setState({ format: val, isChangingFormat: true }, () => {
      setTimeout(() => {
        this.setState({ isChangingFormat: false });
      }, 1500);
    });
  }
  // displayChangeFormatPage() {
  //   this.setState({ isChangingFormat: true }, () => {
  //     setTimeout(() => {
  //       this.setState({ isChangingFormat: "false" });
  //     }, 1500);
  //   });
  // }
  render() {
    return (
      <div className="container">
        <Navbar
          colorLevel={this.state.level}
          onChange={this.changeLevel}
          changeFormat={this.onSelectChange}
        />
        <div
          className={`format-change ${this.state.isChangingFormat && "show"}`}
        />
        <div
          className={`format-change-content ${this.state.isChangingFormat &&
            "show"}`}
        >
          <h1 className="format-change-title">Changing Format</h1>
        </div>

        <div className="palette">
          <div className="combination-boxes">
            {this.props.palette.colors[`${this.state.level}`].map(color => {
              return (
                <ColorBox
                  name={color.name}
                  color={color[`${this.state.format}`]}
                />
              );
            })}
          </div>
        </div>
        <Footer
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}
export default Palette;
