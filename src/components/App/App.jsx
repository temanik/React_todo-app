import React, { Component } from 'react';

import { STATUS_ALL, STATUS_ACTIVE, STATUS_COMPLETED, STATUS_EDITING } from '../../constants';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  state = {
    todoData: [
      this.createNewTask('Active task', STATUS_ACTIVE, 1618993504397, 1),
      this.createNewTask('Active task', STATUS_ACTIVE, 1616933004397, 10),
      this.createNewTask('Completed task', STATUS_COMPLETED, new Date(new Date() - 94397), 13),
      this.createNewTask('Completed task', STATUS_COMPLETED, null, 11),
      this.createNewTask('Active task', STATUS_ACTIVE, null, 18),
    ],

    filter: STATUS_ALL,
  };

  getTaskIndex = (arr, id) => arr.findIndex((item) => item.id === id);

  checkEntriesComplete = (data) => data.some((item) => item.status === STATUS_COMPLETED);

  getLeftTaskCount = (data) =>
    data.reduce((acc, val) => (val.status.includes(STATUS_COMPLETED) ? acc - 1 : acc), data.length);

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const filteredNewData = todoData.filter((task) => task.status !== STATUS_COMPLETED);
      return { todoData: filteredNewData };
    });
  };

  onSort = (filter) => {
    this.setState({ filter });
  };

  onChangeTaskLabel = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const idx = this.getTaskIndex(todoData, id);
      const newTask = { ...todoData[idx] };
      newTask.description = newLabel;
      newTask.status = newTask.status === `${STATUS_ACTIVE} ${STATUS_EDITING}` ? STATUS_ACTIVE : STATUS_COMPLETED;
      const newData = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];

      return { todoData: newData };
    });
  };

  onChangeTaskStatus = (id, status) => {
    this.setState(({ todoData }) => {
      const idx = this.getTaskIndex(todoData, id);
      const newTask = { ...todoData[idx] };
      newTask.status = status;
      const newData = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];

      return { todoData: newData };
    });
  };

  onAddTask = (label) => {
    const task = this.createNewTask(label);

    this.setState(({ todoData }) => {
      const newData = [task, ...todoData];

      return { todoData: newData };
    });
  };

  onDeletedTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = this.getTaskIndex(todoData, id);
      const newState = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return { todoData: newState };
    });
  };

  getFilteredTodoData = (data, filter) =>
    data.filter((task) => {
      const { status } = task;

      switch (true) {
        case filter === STATUS_ALL:
          return true;

        case filter === STATUS_ACTIVE && (status === STATUS_ACTIVE || status === `${STATUS_ACTIVE} ${STATUS_EDITING}`):
          return true;

        case filter === STATUS_COMPLETED &&
          (status === STATUS_COMPLETED || status === `${STATUS_COMPLETED} ${STATUS_EDITING}`):
          return true;

        default:
          return false;
      }
    });

  createNewTask(text, status = STATUS_ACTIVE, createDate, id) {
    const newTask = {
      status,
      description: text,
      crDate: createDate ? new Date(createDate) : new Date(),
      id: id || this.createNewTaskId(),
    };

    return newTask;
  }

  createNewTaskId() {
    const { todoData } = this.state;

    if (Object.keys(todoData).length !== 0) {
      const maxDataId = todoData.map((item) => item.id);
      return Math.max(...maxDataId) + 1;
    }

    return 1;
  }

  render() {
    const { todoData, filter } = this.state;
    const taskCount = this.getLeftTaskCount(todoData);
    const filteredTodoData = this.getFilteredTodoData(todoData, filter);

    return (
      <section className="todoapp">
        <Header onAddTask={this.onAddTask} />
        <section className="main">
          <TaskList
            todoData={filteredTodoData}
            onChangeTaskLabel={this.onChangeTaskLabel}
            onChangeTaskStatus={this.onChangeTaskStatus}
            onDeletedTask={this.onDeletedTask}
          />
          <Footer
            clearBtn={this.checkEntriesComplete(todoData)}
            leftTaskCount={taskCount}
            onClearCompleted={() => this.onClearCompleted()}
            onSort={this.onSort}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
