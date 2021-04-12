import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { STATUS_ACTIVE, STATUS_COMPLETED, STATUS_EDITING } from '../../constants';

import './TaskList.css';

import Task from '../Task';

export default class TaskList extends Component {
  state = {};

  static propTypes = {
    todoData: PropTypes.instanceOf(Array).isRequired,
    onDeletedTask: PropTypes.func.isRequired,
    onChangeTaskLabel: PropTypes.func.isRequired,
    onChangeTaskStatus: PropTypes.func.isRequired,
  };

  statusToggle = (oldStatus, newStatus) => {
    switch (true) {
      case newStatus === STATUS_EDITING:
        return oldStatus === STATUS_COMPLETED
          ? `${STATUS_COMPLETED} ${STATUS_EDITING}`
          : `${STATUS_ACTIVE} ${STATUS_EDITING}`;

      case oldStatus === STATUS_ACTIVE:
        return STATUS_COMPLETED;

      case oldStatus === STATUS_COMPLETED:
        return STATUS_ACTIVE;

      default:
        return newStatus || oldStatus;
    }
  };

  onChangeTaskStatus = (id, fn) => (oldStatus, newStatus) => fn(id, this.statusToggle(oldStatus, newStatus));

  onChangeTaskLabel = (newLabel, id) => {
    this.setState((state) => {
      const newState = { ...state };
      newState[id] = newLabel;

      return newState;
    });
  };

  onSubmitTaskLabel = (evt, id, fn) => {
    if (evt.code === 'Enter' || evt.code === 'NumpadEnter') fn(id, evt.target.value);
  };

  render() {
    const { todoData, onDeletedTask, onChangeTaskLabel, onChangeTaskStatus } = this.props;

    const taskArray = todoData.map((task) => {
      const { id, status, description } = task;

      return (
        <li key={id} className={status}>
          <Task
            {...task}
            onChangeTaskStatus={this.onChangeTaskStatus(id, onChangeTaskStatus)}
            onDeletedTask={() => onDeletedTask(id)}
          />
          <input
            type="text"
            className="edit"
            onChange={(evt) => {
              this.onChangeTaskLabel(evt.target.value, id);
            }}
            onKeyDown={(evt) => this.onSubmitTaskLabel(evt, id, onChangeTaskLabel)}
            // eslint-disable-next-line react/destructuring-assignment
            value={this.state[id] || description}
          />
        </li>
      );
    });

    return <ul className="todo-list">{taskArray}</ul>;
  }
}
