/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Transcribe.css';

const internals = {};
internals.renderData = item => {
  if (!item || !item.confidenceLevel) {
    return '';
  }
  if (moment(item.data, moment.ISO_8601, true).isValid()) {
    return `${moment
      .utc(item.data)
      .format('LL')} [${item.confidenceLevel.toFixed(2)}]`;
  }
  return `${item.data} [${item.confidenceLevel.toFixed(2)}]`;
};

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: '',
      taxAmount: '',
      date: '',
      merchantName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setField = this.setField.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.md5 === newProps.md5) {
      this.setState({
        totalAmount: '',
        taxAmount: '',
        date: '',
        merchantName: ''
      });
    }
  }

  componentDidUpdate() {
    this.setField('totalAmount');
    this.setField('taxAmount');
    this.setField('date');
    this.setField('merchantName');
    Materialize.updateTextFields();
  }

  setField(fieldName) {
    if (
      !this.state[fieldName] &&
      (this.props.userResult[fieldName] || this.props.ocrResult[fieldName].data)
    ) {
      const stateChanged = {};
      const result =
        this.props.userResult[fieldName] ||
        this.props.ocrResult[fieldName].data;
      if (moment(result, moment.ISO_8601, true).isValid()) {
        stateChanged[fieldName] = `${moment.utc(result).format('YYYY-MM-DD')}`;
      } else {
        stateChanged[fieldName] = result;
      }
      this.setState(stateChanged);
    }
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
                {internals.renderData(this.props.ocrResult.totalAmount)}
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
                {internals.renderData(this.props.ocrResult.taxAmount)}
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
                {internals.renderData(this.props.ocrResult.date)}
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
                {internals.renderData(this.props.ocrResult.merchantName)}
              </div>
            </div>
            <div className="row">
              <div className="col s2">
                <input type="submit" value="Save" className="btn" />
              </div>
            </div>
          </div>
          <div className={styles.numbers}>
            <div className="col s12">
              <h6>Amounts</h6>
              {this.props.ocrResult.amounts.map((amount, i) => (
                <span key={`amounts-${i}`} className="col s2">
                  {amount.data}
                </span>
              ))}
            </div>
            <div className="col s12">
              <h6>Line Amounts</h6>
              {this.props.ocrResult.lineAmounts.map((amount, i) => (
                <span key={`lineAmounts-${i}`} className="col s2">
                  {amount.data}
                </span>
              ))}
            </div>
            <div className="col s12">
              <h6>Numbers</h6>
              {this.props.ocrResult.numbers.map((number, i) => (
                <span key={`numbers-${i}`} className="col s4">
                  {number.data}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  md5: PropTypes.string,
  fileRequest: PropTypes.func,
  transcribe: PropTypes.shape({
    apikey: PropTypes.string,
    md5: PropTypes.string,
    contentType: PropTypes.string,
    file: PropTypes.any
  }),
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
    merchantName: PropTypes.string
  })
};

UserForm.defaultProps = {
  md5: undefined,
  fileRequest: undefined,
  transcribe: {},
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
  }
};
