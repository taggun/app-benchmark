import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
                {internals.renderData(this.props.result.totalAmount)}
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
                {internals.renderData(this.props.result.taxAmount)}
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
                {internals.renderData(this.props.result.date)}
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
                {internals.renderData(this.props.result.merchantName)}
              </div>
            </div>
            <div className="row">
              <div className="col s2">
                <input type="submit" value="Save" className="btn" />
              </div>
            </div>
          </div>
          <div className="col s12">
            <h6>Amounts</h6>
            {this.props.result.amounts.map(amount => <span className="col s2">{amount.data}</span>)}
          </div>
          <div className="col s12">
            <h6>Line Amounts</h6>
            {this.props.result.lineAmounts.map(amount => <span className="col s2">{amount.data}</span>)}
          </div>
          <div className="col s12">
            <h6>Numbers</h6>
            {this.props.result.numbers.map(number => <span className="col s4">{number.data}</span>)}
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
    merchantName: PropTypes.object,
    amounts: PropTypes.array,
    lineAmounts: PropTypes.array,
    numbers: PropTypes.array
  })
};

UserForm.defaultProps = {
  fileRequest: undefined,
  transcribe: {},
  result: {
    totalAmount: {},
    taxAmount: {},
    date: {},
    merchantName: {},
    amounts: [],
    lineAmounts: [],
    numbers: []
  }
};
