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
        <h5>LIST</h5>
        <div className="collection">
          {
            list.map((item) =>
              (
                <a href="#!" className="collection-item">
                  {moment(item.timestamp).format('LLL')}
                </a>
              )
            )
          }
        </div>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.array
};

List.defaultProps = {
  list: []
};
