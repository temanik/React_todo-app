import React, { Component } from 'react';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  state = {
    todoData: [
      { status: null, description: 'Editing task', crDate: new Date(1616434004397), id: 2 },
      { status: null, description: 'Completed task', crDate: new Date(1616434004397), id: 11 },
      { status: 'completed', description: 'Active task', crDate: new Date(1616434004397), id: 3 },
      {
        status: null,
        description: 'Completed task',
        crDate: new Date(1616431004000),
        id: 16,
      },
      { status: null, description: 'Active task', crDate: new Date(), id: 30 },
    ],

    filter: 'all',
  };

  isStatusCompleted = (status) => !!(status !== null && status.includes('completed'));

  getTaskIndex = (arr, id) => arr.findIndex((item) => item.id === id);

  entriesComplete = (data) => data.some((item) => this.isStatusCompleted(item.status));

  getLeftTaskCount = (data) => {
    const leftTask = data.filter((item) => this.isStatusCompleted(item.status));
    return data.length - leftTask.length;
  };

  onClearCompleted = (data) => {
    data.forEach((item) => {
      if (this.isStatusCompleted(item.status)) this.onDeletedTask(item.id);
    });
  };

  createNewTaskId = (data) => {
    if (Object.keys(data).length !== 0) {
      const maxDataId = data.map((item) => item.id);
      return Math.max(...maxDataId) + 1;
    }

    return 1;
  };

  createNewTask = (text) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];
      newData.unshift({
        status: null,
        description: text,
        crDate: new Date(),
        id: this.createNewTaskId(newData),
      });

      return { todoData: newData };
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
      newTask.status = newTask.status === 'editing' ? null : 'completed';
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
        case filter === 'all':
          return true;

        case filter === null && (status === null || status === 'editing'):
          return true;

        case filter === 'completed' && status !== null && status.includes('completed'):
          return true;

        default:
          return false;
      }
    });

  render() {
    const { todoData, filter } = this.state;
    const taskCount = this.getLeftTaskCount(todoData);
    const filteredTodoData = this.getFilteredTodoData(todoData, filter);

    return (
      <section className="todoapp">
        <Header createNewTask={this.createNewTask} />
        <section className="main">
          <TaskList
            todoData={filteredTodoData}
            onChangeTaskLabel={this.onChangeTaskLabel}
            onChangeTaskStatus={this.onChangeTaskStatus}
            onDeletedTask={this.onDeletedTask}
          />
          <Footer
            clearBtn={this.entriesComplete(todoData)}
            leftTaskCount={taskCount}
            onClearCompleted={() => this.onClearCompleted(todoData)}
            onSort={this.onSort}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
