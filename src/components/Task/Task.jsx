/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" />
            <button className="icon icon-pause" />
            12:25
          </span>
          <span className="description">{this.createAddTime(crDate)}</span>
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
