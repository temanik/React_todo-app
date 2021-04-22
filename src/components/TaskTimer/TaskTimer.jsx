/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prefer-const */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskTimer.css';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    taskTime: this.props.taskTime,
    timerId: null,
  };

  static propTypes = {
    taskTime: PropTypes.number.isRequired,
  };

  componentWillUnmount = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
  };

  onStartTaskTimer = () => {
    const { timerId, taskTime } = this.state;

    if (taskTime !== 0 && !timerId) {
      const newTimerId = setInterval(() => {
        // eslint-disable-next-line no-shadow
        let { taskTime } = this.state;
        console.log(taskTime);
        if (taskTime <= 0) return this.onPauseTaskTimer();

        taskTime -= 1;

        this.setState({ taskTime });

        return false;
      }, 1000);

      this.setState({ timerId: newTimerId });
    }
  };

  onPauseTaskTimer = () => {
    const { timerId } = this.state;

    if (timerId) {
      clearInterval(timerId);
      this.setState({ timerId: null });
    }
  };

  secondsToTime = (duration) => {
    let seconds = Math.floor(duration % 60);
    let minutes = Math.floor(duration / 60);

    minutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}${seconds}`;
  };

  render() {
    const { taskTime } = this.state;

    return (
      <>
        <span>
          <button className="icon icon-play" onClick={() => this.onStartTaskTimer()} />
          <button className="icon icon-pause" onClick={() => this.onPauseTaskTimer()} />
        </span>
        <span className="timer-time">{this.secondsToTime(taskTime)}</span>
      </>
    );
  }
}
