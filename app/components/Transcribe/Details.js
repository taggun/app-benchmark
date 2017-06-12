import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import FileViewer from './FileViewer';

export default class Details extends Component {
  render() {
    return (
      <div>
        <div className="col s4">
          <FileViewer
            apikey={this.props.apikey}
            md5={this.props.match.params.md5}
            contentType={this.props.contentType}
          />
        </div>
        <div className="col s5">
          <UserForm
            id={this.props.id}
            apikey={this.props.apikey}
            md5={this.props.match.params.md5}
            target={this.props.target}
            ocrResult={this.props.ocrResult}
            userResult={this.props.userResult}
            saveRequest={this.props.saveRequest}
          />
        </div>
      </div>
    );
  }
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      md5: PropTypes.string
    })
  }),
  contentType: PropTypes.string,
  apikey: PropTypes.string,
  target: PropTypes.string,
  ocrResult: PropTypes.shape({
    totalAmount: PropTypes.object,
    taxAmount: PropTypes.object,
    date: PropTypes.object,
    merchantName: PropTypes.object,
    amounts: PropTypes.array,
    lineAmounts: PropTypes.array,
    numbers: PropTypes.array
  }),
  userResult: PropTypes.shape({
    totalAmount: PropTypes.number,
    taxAmount: PropTypes.number,
    date: PropTypes.ISO_8601,
    merchantName: PropTypes.string,
  }),
  id: PropTypes.string,
  saveRequest: PropTypes.func
};

Details.defaultProps = {
  home: {},
  userForm: {},
  match: {},
  contentType: undefined,
  apikey: undefined,
  target: undefined,
  ocrResult: {
    totalAmount: {},
    taxAmount: {},
    date: {},
    merchantName: {},
    amounts: [],
    lineAmounts: [],
    numbers: []
  },
  userResult: {
    totalAmount: undefined,
    taxAmount: undefined,
    date: undefined,
    merchantName: undefined
  },
  id: undefined,
  saveRequest: undefined
};
