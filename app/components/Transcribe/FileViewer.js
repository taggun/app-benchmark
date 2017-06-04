import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FileViewer extends Component {
  render() {
    const { apikey, md5, contentType } = this.props;
    return (
      <div>
        {apikey}
        {md5}
        {contentType}
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
