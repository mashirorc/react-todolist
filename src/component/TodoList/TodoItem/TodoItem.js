import React, { useState } from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {

  state = {
    inputText: this.props.todo.title,
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  render() {
    const { id, title, editing, completed } = this.props.todo;
    const { onDelete, onEdit, onComplete } = this.props;
    let titleDisplay
    if(!editing){
      titleDisplay = <span onClick={() => onComplete(id, title, !completed)} className = {completed? "completed": "incomplete"}>{title}</span>
    } else {
      titleDisplay = <input type="text" value={this.state.inputText} onChange={this.handleChange}/>
    }
    return (
      <li className="todoitem">
        {titleDisplay}
        <button className="btn btn--edit" onClick={() => onEdit(id, this.state.inputText)}>
          edit
        </button>
        <button className="btn btn--delete" onClick={() => onDelete(id)}>
          delete
        </button>
      </li>
    );
  }
}
// id, title, completed, delete button

export default TodoItem;
