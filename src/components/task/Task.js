import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'
import classNames from 'classnames'

export default class Task extends Component {
  render() {
    const { todo, onDeleted, onToggleDone } = this.props
    const { completed } = todo
    return (
      <li className={classNames({ completed })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="description">{todo.title}</span>
            <span className="created">{formatDistanceToNow(todo.createDate)}</span>
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

Task.defaultProps = {
  todo: {},
  onDeleted: () => {},
  onToggleDone: () => {},
}
