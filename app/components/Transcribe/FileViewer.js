import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FileViewer extends Component {

  componentDidMount() {
  }

  render() {
    const { apikey, md5, contentType } = this.props;
    const benchmarkApiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3022'
      : 'https://api-benchmark.taggun.io';
    return (
      <div>
        {contentType && contentType !== 'application/pdf'
          ? <img
            width="500"
            src={`${benchmarkApiUrl}/api/benchmark/v1/file/${md5}?apikey=${apikey}`}
            alt="receipt or invoice"
          />
          : ''}
        {contentType && contentType === 'application/pdf'
          ? <iframe
            title="pdf receipt"
            width="500"
            src={`${benchmarkApiUrl}/api/benchmark/v1/file/${md5}?apikey=${apikey}`}
          />
          : ''}
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
