import React, { Component } from "react";
import DraggableColorBox from "./draggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
class DraggableColorList extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        {this.props.colors.map((color, index) => {
          return (
            <DraggableColorBox
              color={color.color}
              name={color.name}
              index={index}
              handleRemove={() => this.props.handleDelete(color.name)}
            />
          );
        })}
      </div>
    );
  }
}
export default SortableContainer(DraggableColorList);
