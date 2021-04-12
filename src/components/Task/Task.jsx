import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import { STATUS_COMPLETED, STATUS_EDITING } from '../../constants';

import './Task.css';

export default class Task extends Component {
  static propTypes = {
    onChangeTaskStatus: PropTypes.func.isRequired,
    onDeletedTask: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    crDate: PropTypes.instanceOf(Date).isRequired,
  };

  isStatusCompleted = (status) => status === STATUS_COMPLETED;

  createAddTime = (crDate) => formatDistanceToNow(crDate.getTime(), { includeSeconds: true });

  render() {
    const { onChangeTaskStatus, onDeletedTask, status, description, crDate } = this.props;

    return (
      <div className="view">
        <input
          checked={this.isStatusCompleted(status)}
          className="toggle"
          type="checkbox"
          onChange={() => onChangeTaskStatus(status)}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{this.createAddTime(crDate)}</span>
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
