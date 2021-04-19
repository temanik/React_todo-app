import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.css';

export default class Header extends Component {
  state = {
    label: '',
  };

  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  onLabelChange = (value) => {
    this.setState({ label: value });
  };

  onLabelSubmit = (eCode, fn) => {
    this.setState(({ label }) => {
      if (eCode === 'Enter' || eCode === 'NumpadEnter') {
        if (label !== '') fn(label);

        return { label: '' };
      }

      return false;
    });
  };

  render() {
    const { label } = this.state;
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
            onChange={(evt) => this.onLabelChange(evt.target.value)}
            onKeyDown={(evt) => this.onLabelSubmit(evt.code, onAddTask)}
            value={label}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    );
  }
}
