import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'
import classNames from 'classnames'

export default class Task extends Component {
  state = {
    isPaused: true,
    timer: null,
    sec: 0,
    min: 0,
  }

  startTimer = (timerId = null, isPaused = true) => {
    if (timerId && !isPaused) return

    let timer = setInterval(() => {
      this.setState(({ sec, min }) => {
        if (Number(sec) == 0 && Number(min) > 0) return { sec: 59, min: Number(min) - 1 }
        if (Number(sec) <= 0 && Number(min) <= 0) return { sec: 0, min: 0 }
        return {
          sec: Number(sec) - 1,
        }
      })
    }, 1000)

    this.setState({ timer: timer, isPaused: false })
  }

  pauseTimer = (timer) => {
    clearInterval(timer)
    this.setState({ isPaused: true })
  }

  componentWillUnmount() {
    const { saveTimer, id } = this.props
    saveTimer(this.state.min, this.state.sec, this.state.timer, this.state.isPaused, id)
    clearInterval(this.state.timer)
  }

  componentDidMount() {
    const { todo } = this.props
    const { minutes, seconds, timer, isPaused } = todo

    this.setState({ sec: seconds, min: minutes, timer: timer, isPaused: isPaused })

    if (timer && !isPaused) this.startTimer()
    if (timer) clearInterval(timer)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time == null && this.state.timer) clearInterval(this.state.timer - 1)
  }
  render() {
    const { todo, onDeleted, onToggleDone } = this.props
    const { sec, min, timer, isPaused } = this.state
    const { completed } = todo

    return (
      <li className={classNames({ completed })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="title">{todo.title}</span>
            <span className="description">
              <button className="icon icon-play" onClick={() => this.startTimer(timer, isPaused)} />
              <button className="icon icon-pause" onClick={() => this.pauseTimer(timer)} />
            </span>
            <span className="description">
              {min < 10 ? '0' : ''}
              {min}:{sec < 10 ? '0' : ''}
              {sec}
            </span>
            <span className="description">{formatDistanceToNow(todo.createDate)}</span>
          </label>
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
