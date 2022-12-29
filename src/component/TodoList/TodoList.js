import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { getTodos, addTodo, removeTodo, editTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
      };

      addTodo(newTodo).then((todo) => {
        this.setState({
          todos: [...this.state.todos, todo],
          inputText: "",
        });
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  handleEdit = (id, newTitle) => {
    editTodo(id, newTitle).then(() => {
      this.setState({
        todos: this.state.todos.map((todo) => {
          if (id === todo.id) {
            if (todo.editing){
              todo.editing = false
              todo.title = newTitle
            } else {
              todo.editing = true
            }
          }
          return todo     
        }),
      });
    })
  }

  handleComplete = (id, title, completed) => {
    editTodo(id, title, completed).then(() => {
      this.setState({
        todos: this.state.todos.map((todo) => {
          if (id === todo.id) {
            todo.completed = completed
          }
          return todo     
        }),
      });
    })
  }

  render() {
    let reminderText = null
    if(this.state.todos.every((todo) => todo.completed)){
      reminderText = <p id="list-reminder-text">no active task</p>
    }
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          {reminderText}
          {this.state.todos.map((todo) => (
            todo.completed ? null : <TodoItem key={todo.id} todo={todo} onEdit={this.handleEdit} onDelete={this.handleDelete} onComplete={this.handleComplete}/>
          ))}
          <li id="empty-li"><br /></li>
          {this.state.todos.map((todo) => (
            todo.completed ? <TodoItem key={todo.id} todo={todo} onEdit={this.handleEdit} onDelete={this.handleDelete} onComplete={this.handleComplete}/> : null
          ))}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getTodos().then((data) => {
      console.log(data);
      this.setState({
        todos: data,
      });
    });
  }
}

export default TodoList;
