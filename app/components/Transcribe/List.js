/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Transcribe.css';

export default class List extends Component {
  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        <div className="collection">
          {list.map(item => (
            <a
              href="#!"
              className="collection-item"
              value={item}
              onClick={event => this.props.onSelect(event, item)}
              key={`${item.md5}${item.timestamp}`}
            >
              <span>
                {moment(item.timestamp).format('LLL')}
              </span>
              <span className={styles.contentType}>
                {item.contentType.split('/')[1]}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.array,
  onSelect: PropTypes.func
};

List.defaultProps = {
  list: [],
  onSelect: undefined
};
