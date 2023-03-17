import React, { Component } from 'react'

import './AddTask.css'

export default class NewTaskForm extends Component {
  state = {
    title: '',
  }

  onLabelChange = (e) => {
    if (e.target.value[0] === ' ') {
      e.target.value = ''
      e.target.placeholder = 'Type any symbol — not a space'
    } else e.target.placeholder = 'What needs to be done?'
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
          required
          onChange={this.onLabelChange}
        ></input>
        <button type="submit"></button>
      </form>
    )
  }
}
