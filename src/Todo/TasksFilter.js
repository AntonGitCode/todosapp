import React from 'react'
import PropTypes from 'prop-types'

function TasksFilter({ makeFiltered }) {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => makeFiltered('all')}>All</button>
      </li>
      <li>
        <button onClick={() => makeFiltered('active')}>Active</button>
      </li>
      <li>
        <button onClick={() => makeFiltered('completed')}>Completed</button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  makeFiltered: PropTypes.func.isRequired,
}

export default TasksFilter
