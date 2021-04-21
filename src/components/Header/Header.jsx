import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.css';

export default class Header extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  timeConverter = (min, sec) => {
    console.log(min * 60 + sec * 1000);
    return (min * 60 + sec) * 1000;
  };

  inputValidator = (value, isOnlyNum) => !isOnlyNum || !Number.isNaN(+value);

  onInputChange = (inputName, value, isOnlyNum = false) => {
    if (this.inputValidator(value, isOnlyNum)) return this.setState({ [inputName]: value });
    return false;
  };

  onInputSubmit = (eCode, fn) => {
    this.setState(({ label, min, sec }) => {
      if (eCode === 'Enter' || eCode === 'NumpadEnter') {
        if (label !== '') fn(label, this.timeConverter(+min, +sec));

        return {
          label: '',
          min: '',
          sec: '',
        };
      }

      return false;
    });
  };

  render() {
    const { label, min, sec } = this.state;
    const { onAddTask } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={(evt) => this.onInputChange('label', evt.target.value)}
            onKeyDown={(evt) => this.onInputSubmit(evt.code, onAddTask)}
            value={label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(evt) => this.onInputChange('min', evt.target.value, true)}
            onKeyDown={(evt) => this.onInputSubmit(evt.code, onAddTask)}
            value={min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(evt) => this.onInputChange('sec', evt.target.value, true)}
            onKeyDown={(evt) => this.onInputSubmit(evt.code, onAddTask)}
            value={sec}
          />
        </form>
      </header>
    );
  }
}
