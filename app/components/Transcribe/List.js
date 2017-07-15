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
              <span className="hide-on-med-and-down">
                {moment(item.timestamp).format('LLL')}
              </span>
              <span className="hide-on-small-and-down hide-on-large-only">
                {moment(item.timestamp).format('LL')}
              </span>
              <span className="show-on-small">
                &nbsp;
              </span>
              <span className={`hide-on-med-and-down ${styles.contentType}`}>
                {item.contentType.split('/')[1]}
              </span>
              { item.benchmark ?
                (
                  <span>
                    <Badge
                      result={item.benchmark.merchantNameResult}
                      text="M"
                      isVisible={!!item.benchmark.merchantName}
                    />
                    <Badge
                      result={item.benchmark.dateResult}
                      text="D"
                      isVisible={!!item.benchmark.date}
                    />
                    <Badge
                      result={item.benchmark.taxAmountResult}
                      text="X"
                      isVisible={!!item.benchmark.taxAmount}
                    />
                    <Badge
                      result={item.benchmark.totalAmountResult}
                      text="$"
                      isVisible={!!item.benchmark.totalAmount}
                    />
                  </span>
                )
              :
              ''
              }
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
