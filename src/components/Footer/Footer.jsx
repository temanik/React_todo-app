import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

export default class Footer extends Component {
  static defaultProps = {
    filter: null,
  };

  static propTypes = {
    leftTaskCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    filter: PropTypes.string,
    clearBtn: PropTypes.bool.isRequired,
  };

  filterSelected = (filterBtn, filter) => (filter === filterBtn ? 'selected' : null);

  render() {
    const { leftTaskCount, onClearCompleted, onSort, filter, clearBtn } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{leftTaskCount} items left</span>
        <ul className="filters">
          <li>
            <button
              type="button"
              className={this.filterSelected('all', filter)}
              onClick={() => {
                onSort('all');
              }}
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              className={this.filterSelected(null, filter)}
              onClick={() => {
                onSort(null);
              }}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type="button"
              className={this.filterSelected('completed', filter)}
              onClick={() => {
                onSort('completed');
              }}
            >
              Completed
            </button>
          </li>
        </ul>
        <button type="button" className="clear-completed" onClick={onClearCompleted}>
          {clearBtn ? 'Clear completed' : ''}
        </button>
      </footer>
    );
  }
}
