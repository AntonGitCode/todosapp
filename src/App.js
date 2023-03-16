import React, { Component } from 'react'

import TaskList from './Todo/TaskList'
import NewTaskForm from './Todo/AddTask'
import Footer from './Todo/Footer'

export default class App extends Component {
  state = {
    todos: [this.createTask(' Active Task 1 ')],
    statusFilter: 'all',
  }

  createTask(title) {
    return {
      title,
      id: Date.now(),
      completed: 'active',
    }
  }

  addTask = (title) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.concat([this.createTask(title)]),
      }
    })
  }

  deleteTodo = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)]
      return {
        todos: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const oldTodo = todos[idx]
      const newTodo =
        todos[idx].completed === 'active' ? { ...oldTodo, completed: 'completed' } : { ...oldTodo, completed: 'active' }

      const newArray = [...todos.slice(0, idx), newTodo, ...todos.slice(idx + 1)]
      return { todos: newArray }
    })
  }

  makeFiltered = (newStatus) => {
    this.setState(() => {
      return {
        statusFilter: newStatus,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todos }) => {
      return {
        todos: todos.filter((el) => el.completed !== 'completed'),
      }
    })
  }

  render() {
    const { todos, statusFilter } = this.state
    const activeTodoCount = todos.length - todos.filter((el) => el.completed === 'completed').length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          {todos.length ? (
            <TaskList
              todos={todos}
              onDeleted={this.deleteTodo}
              onToggleDone={this.onToggleDone}
              statusFilter={statusFilter}
            />
          ) : (
            <p className="list-is-empty">List is empty.Type above to add task</p>
          )}
          {
            <Footer
              activeTodoCount={activeTodoCount}
              makeFiltered={this.makeFiltered}
              clearCompleted={this.clearCompleted}
              statusFilter={statusFilter}
            />
          }
        </section>
      </section>
    )
  }
}
