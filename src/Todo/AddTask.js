import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  state = {
    title: '',
  }

  onLabelChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addTask(this.state.title)
    this.setState({
      title: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.title}
          autoFocus
          onChange={this.onLabelChange}
        ></input>
        <button type="submit"></button>
      </form>
    )
  }
}
