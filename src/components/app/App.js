import React, { Component } from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../AddTask'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  state = {
    todos: [this.createTask(' Active Task 1 ')],
    statusFilter: 'all',
  }

  createTask(title) {
    return {
      title,
      createDate: Date.now(),
      completed: false,
    }
  }

  addTask = (title) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.concat([this.createTask(title)]),
      }
    })
  }

  deleteTodo = (createDate) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.createDate === createDate)
      const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)]
      return {
        todos: newArray,
      }
    })
  }

  onToggleDone = (createDate) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.createDate === createDate)
      const oldTodo = todos[idx]
      const newTodo =
        todos[idx].completed === false ? { ...oldTodo, completed: true } : { ...oldTodo, completed: false }

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
        todos: todos.filter((el) => !el.completed),
      }
    })
  }

  render() {
    const { todos, statusFilter } = this.state
    const activeTodoCount = todos.length - todos.filter((el) => el.completed).length

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
            <p className="list-is-empty">List is empty - type above to add a task</p>
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
