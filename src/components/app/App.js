import React, { Component } from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../AddTask'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  counter = 1

  state = {
    todos: [],
    statusFilter: 'all',
  }

  saveTimer = (unmountedMin, unmountedSec, unmountedTimerId, isPaused, unmountedId) => {
    // распарсили верхний стейт , сохраняем тудушные значения таймера (мин сек) и сам таймер в переменные

    const { todos } = this.state
    const idx = todos.findIndex((el) => el.id === unmountedId)
    const oldTodo = todos[idx]
    const newTodo = {
      ...oldTodo,
      minutes: unmountedMin,
      seconds: unmountedSec,
      timer: unmountedTimerId,
      isPaused: isPaused,
    }

    const newArr = [...todos.slice(0, idx), newTodo, ...todos.slice(idx + 1)]

    // если Таймер Не запускался (нет его) или стоит на паузе
    // то здесь можно сохранить только минуты и секунды, и выйти
    // ? ОБНОВЛЯЕМ СТЕЙТ то есть setState и return

    if (!unmountedTimerId || isPaused) {
      this.setState({ todos: newArr })
      return
    }

    // если таймер был создан , и при unmount'е был запущен
    // то запускаем здесь временный таймер
    // сразу после инициации Таймера нужно записать его значение в newArr (подготовленный для обновления состояния)

    const tempTimerId = setInterval(() => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === unmountedId)
        const oldTodo = todos[idx]

        const { minutes, seconds } = oldTodo
        let newMinutes = Number(minutes)
        let newSeconds = Number(seconds)

        if (Number(seconds) == 0 && Number(minutes) > 0) {
          newMinutes--
          newSeconds = 59
        }
        if (Number(seconds) == 0 && Number(minutes) == 0) {
          newSeconds = 0
          newMinutes = 0
        }
        newSeconds--

        const newTodo = {
          ...oldTodo,
          minutes: newMinutes,
          seconds: newSeconds,
        }
        const newArr = [...todos.slice(0, idx), newTodo, ...todos.slice(idx + 1)]
        return { todos: newArr }
      })
    }, 1000)

    const updTodo = {
      ...newTodo,
      timer: tempTimerId,
    }
    const updArr = [...todos.slice(0, idx), updTodo, ...todos.slice(idx + 1)]
    this.setState({ todos: updArr })
  }

  createTask = (title, mins, secs) => {
    return {
      id: this.counter++,
      title,
      createDate: Date.now(),
      completed: false,
      minutes: mins,
      seconds: secs,
      timer: null,
      isPaused: true,
    }
  }

  addTask = (title, mins, secs) => {
    this.setState(({ todos }) => {
      return {
        todos: todos.concat([this.createTask(title, mins, secs)]),
      }
    })
  }

  deleteTodo = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.createDate === id)
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
              saveTimer={this.saveTimer}
              clearTemporaryTimer={this.clearTemporaryTimer}
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
