/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TaskTimer from '../TaskTimer';

import { STATUS_COMPLETED, STATUS_EDITING } from '../../constants';

import './Task.css';

export default class Task extends Component {
  state = {};

  static propTypes = {
    onChangeTaskStatus: PropTypes.func.isRequired,
    onDeletedTask: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    crDate: PropTypes.instanceOf(Date).isRequired,
    taskTime: PropTypes.number.isRequired,
  };

  isStatusCompleted = (status) => status === STATUS_COMPLETED;

  createAddTime = (crDate) => formatDistanceToNow(crDate.getTime(), { includeSeconds: true });

  render() {
    const { onChangeTaskStatus, onDeletedTask, status, description, crDate, taskTime } = this.props;

    return (
      <div className="view">
        <input
          checked={this.isStatusCompleted(status)}
          className="toggle"
          type="checkbox"
          onChange={() => onChangeTaskStatus(status)}
        />
        <label>
          <span className="title">{description}</span>
          <span className="description timer">
            <TaskTimer taskTime={taskTime} />
          </span>
          <span className="description created-time">{this.createAddTime(crDate)}</span>
        </label>
        <button
          type="button"
          aria-label="edit icon"
          className="icon icon-edit"
          onClick={() => onChangeTaskStatus(status, STATUS_EDITING)}
        />
        <button type="button" aria-label="delete icon" className="icon icon-destroy" onClick={onDeletedTask} />
      </div>
    );
  }
}
