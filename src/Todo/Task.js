import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  render() {
    const { todo, onDeleted, onToggleDone } = this.props
    const { completed } = todo

    if (completed === 'editing')
      return (
        <li className={completed}>
          <input type="text" className="edit" placeholder={todo.title}></input>
        </li>
      )

    let doneClassName = completed === 'completed' ? 'completed' : 'active'
    let isChecked = completed === 'completed' ? true : false

    return (
      <li className={doneClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isChecked} onChange={onToggleDone}></input>

          <label>
            <span className="description">{todo.title}</span>
            <span className="created">{formatDistanceToNow(todo.id)}</span>
          </label>

          <button className="icon icon-edit" />

          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}

Task.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}
