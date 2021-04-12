import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { STATUS_ALL, STATUS_ACTIVE, STATUS_COMPLETED } from '../../constants';

import './Footer.css';

export default class Footer extends Component {
  static defaultProps = {
    filter: STATUS_ALL,
  };

  static propTypes = {
    leftTaskCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    filter: PropTypes.string,
    clearBtn: PropTypes.bool.isRequired,
  };

  filterSelected = (filterBtn, filter) => (filter === filterBtn ? 'selected' : null);

  getFilterButtonElement = (status, label) => {
    const { onSort, filter } = this.props;

    return (
      <li>
        <button
          type="button"
          className={this.filterSelected(status, filter)}
          onClick={() => {
            onSort(status);
          }}
        >
          {label}
        </button>
      </li>
    );
  };

  getClearBtn = (clearBtn) => {
    const { onClearCompleted } = this.props;

    if (clearBtn)
      return (
        <button type="button" className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      );

    return false;
  };

  render() {
    const { leftTaskCount, clearBtn } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{leftTaskCount} items left</span>

        <ul className="filters">
          {this.getFilterButtonElement(STATUS_ALL, 'All')}
          {this.getFilterButtonElement(STATUS_ACTIVE, 'Active')}
          {this.getFilterButtonElement(STATUS_COMPLETED, 'Completed')}
        </ul>

        {this.getClearBtn(clearBtn)}
      </footer>
    );
  }
}
