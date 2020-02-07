import React from "react";
import seedColors from "./seedColors";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import "./styles.css";
import Palette from "./palette";
import Home from "./home";
import CreatePalette from "./createpalette";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteList: seedColors
    };
    this.findPalette = this.findPalette.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  findPalette(id) {
    return this.state.paletteList.find(palette => {
      return palette.id === id;
    });
  }
  handleSubmit(colors, name) {
    console.log(name);
    var id = name.toLowerCase().replace(/ /g, "-");
    this.setState({
      paletteList: [
        ...this.state.paletteList,
        { paletteName: name, id: id, colors: colors }
      ]
    });
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home palettes={this.state.paletteList} />}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeParams => {
            return (
              <Palette
                palette={generatePalette(
                  this.findPalette(routeParams.match.params.id)
                )}
              />
            );
          }}
        />
        <Route
          exact
          path="/create"
          render={routeParams => (
            <CreatePalette
              submit={this.handleSubmit}
              palettes={this.state.paletteList}
              {...routeParams}
            />
          )}
        />
      </Switch>
    );
  }
}
export default App;
