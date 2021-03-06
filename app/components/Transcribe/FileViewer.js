import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Transcribe.css';

export default class FileViewer extends Component {

  render() {
    const { apikey, md5, contentType } = this.props;
    const benchmarkApiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3022'
      : 'https://api-benchmark.taggun.io';
    return (
      <div className={styles.fileViewer}>
        <img
          width="400"
          src={`${benchmarkApiUrl}/api/benchmark/v1/file/${md5}?apikey=${apikey}`}
          alt="receipt or invoice"
        />
      </div>
    );
  }
}
FileViewer.propTypes = {
  apikey: PropTypes.string,
  md5: PropTypes.string,
  contentType: PropTypes.string
};
FileViewer.defaultProps = {
  apikey: undefined,
  md5: undefined,
  contentType: undefined
};
