import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Task extends Component {
  render() {
    const { todo, onDeleted, onToggleDone } = this.props
    const { completed } = todo

    const taskClassName = classNames({ completed: completed === true })
    const isChecked = taskClassName

    return (
      <li className={taskClassName}>
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
