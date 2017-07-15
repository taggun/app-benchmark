/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Transcribe.css';

export default class Badge extends Component {
  render() {
    return (
      <span
        className={`new badge ${this.props.color} ${this.props.isVisible ? styles.badge : styles.badgeInvisible}`}
        data-badge-caption={this.props.text}
      />
    );
  }
}

Badge.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  isVisible: PropTypes.bool
};

Badge.defaultProps = {
  text: undefined,
  color: undefined,
  isVisible: undefined
};
