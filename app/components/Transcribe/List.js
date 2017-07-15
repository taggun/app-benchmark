/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Transcribe.css';
import Badge from './Badge';

export default class List extends Component {
  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        <div className="collection">
          {list.map(item => (
            <a
              href="#!"
              className={`collection-item ${item.md5 === this.props.activeMd5 ? 'active' : ''}`}
              onClick={event => this.props.onSelect(event, item)}
              key={`${item.md5}${item.timestamp}`}
            >
              <span>
                {moment(item.timestamp).format('LLL')}
              </span>
              <span className={styles.contentType}>
                {item.contentType.split('/')[1]}
              </span>
              <Badge
                color="grey"
                text="M"
                isVisible={item.benchmark && item.benchmark.merchantName}
              />
              <Badge
                color="grey"
                text="D"
                isVisible={item.benchmark && item.benchmark.date}
              />
              <Badge
                color="grey"
                text="X"
                isVisible={item.benchmark && item.benchmark.taxAmount}
              />
              <Badge
                color="grey"
                text="$"
                isVisible={item.benchmark && item.benchmark.totalAmount}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.array,
  onSelect: PropTypes.func,
  activeMd5: PropTypes.string,
};

List.defaultProps = {
  list: [],
  onSelect: undefined,
  activeMd5: undefined
};
