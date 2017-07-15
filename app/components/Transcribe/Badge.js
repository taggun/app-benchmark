/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Transcribe.css';

export default class Badge extends Component {
  render() {
    let color = 'grey';
    if (this.props.result === true) {
      color = 'green accent-4';
    } else if (this.props.result === false) {
      color = 'red';
    }
    return (
      <span
        className={`hide-on-med-and-down new badge ${color} ${this.props.isVisible ? styles.badge : styles.badgeInvisible}`}
        data-badge-caption={this.props.text}
      />
    );
  }
}

Badge.propTypes = {
  text: PropTypes.string,
  result: PropTypes.bool,
  isVisible: PropTypes.bool
};

Badge.defaultProps = {
  text: undefined,
  result: undefined,
  isVisible: undefined
};
