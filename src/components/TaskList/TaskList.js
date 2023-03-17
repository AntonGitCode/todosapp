import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleDone, statusFilter }) {
  let filteredArray = [...todos]

  if (statusFilter === 'active') filteredArray = todos.filter((el) => !el.completed)
  if (statusFilter === 'completed') filteredArray = todos.filter((el) => el.completed)

  const elements = filteredArray.map((todo, index) => {
    const { createDate } = todo
    return (
      <Task
        todo={todo}
        onDeleted={() => onDeleted(createDate)}
        key={index}
        onToggleDone={() => onToggleDone(createDate)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  statusFilter: PropTypes.string,
}

export default TaskList
