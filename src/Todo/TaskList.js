import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

function TaskList({ todos, onDeleted, onToggleDone, statusFilter }) {
  let filteredArray = [...todos]

  if (statusFilter === 'active') filteredArray = todos.filter((el) => el.completed === 'active')
  if (statusFilter === 'completed') filteredArray = todos.filter((el) => el.completed === 'completed')

  const elements = filteredArray.map((todo) => {
    const { id } = todo

    return <Task todo={todo} onDeleted={() => onDeleted(id)} key={id} onToggleDone={() => onToggleDone(id)} />
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
