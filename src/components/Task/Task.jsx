import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    status: null,
  };

  static propTypes = {
    onChangeTaskStatus: PropTypes.func.isRequired,
    onDeletedTask: PropTypes.func.isRequired,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)]),
    description: PropTypes.string.isRequired,
    crDate: PropTypes.instanceOf(Date).isRequired,
  };

  isStatusCompleted = (status) => status === 'completed';

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
          onClick={() => onChangeTaskStatus(status, 'editing')}
        />
        <button type="button" aria-label="delete icon" className="icon icon-destroy" onClick={onDeletedTask} />
      </div>
    );
  }
}
