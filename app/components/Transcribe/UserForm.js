import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const stateChanged = {};
    stateChanged[event.target.id] = event.target.value;
    this.setState(stateChanged);
  }

  handleSubmit(event) {
    this.props.fileRequest(this.props.transcribe.apikey, this.props.transcribe);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="row valign-wrapper">
              <div className="input-field browser-default col s6">
                <input
                  required="true"
                  id="totalAmount"
                  type="text"
                  value={this.state.totalAmount}
                  onChange={this.handleChange}
                />
                <label htmlFor="totalAmount">
                  Total
                </label>
              </div>
              <div className="col s6">
                {this.props.result.totalAmount.data}
              </div>
            </div>
            <div className="valign-wrapper">
              <div className="input-field browser-default col s6">
                <input
                  required="true"
                  id="taxAmount"
                  type="text"
                  value={this.state.taxAmount}
                  onChange={this.handleChange}
                />
                <label htmlFor="taxAmount">
                  Tax
                </label>
              </div>
              <div className="col s6">
                {this.props.result.taxAmount.data}
              </div>
            </div>
            <div className="valign-wrapper">
              <div className="input-field browser-default col s6">
                <input
                  required="true"
                  id="date"
                  type="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col s6">
                {this.props.result.date.data && moment.utc(this.props.result.date.data).format('LL')}
              </div>
            </div>
            <div className="valign-wrapper">
              <div className="input-field browser-default col s6">
                <input
                  id="merchantName"
                  type="text"
                  value={this.state.merchantName}
                  onChange={this.handleChange}
                />
                <label htmlFor="merchantName">
                  Merchant name
                </label>
              </div>
              <div className="col s6">
                {this.props.result.merchantName.data}
              </div>
            </div>
            <div className="row">
              <div className="col s2">
                <input type="submit" value="Save" className="btn" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  fileRequest: PropTypes.func,
  transcribe: PropTypes.shape({
    apikey: PropTypes.string,
    md5: PropTypes.string,
    contentType: PropTypes.string,
    file: PropTypes.any
  }),
  result: PropTypes.shape({
    totalAmount: PropTypes.object,
    taxAmount: PropTypes.object,
    date: PropTypes.object,
    merchantName: PropTypes.object
  })
};

UserForm.defaultProps = {
  fileRequest: undefined,
  transcribe: {},
  result: {
    totalAmount: {},
    taxAmount: {},
    date: {},
    merchantName: {}
  }
};
