import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <form className="col 12" onSubmit={this.handleSubmit}>
          <div className="col s12">
            <div className="row">
              <div className="input-field browser-default col s12">
                <input
                  required="true"
                  id="total"
                  type="text"
                  value={this.state.total}
                  onChange={this.handleChange}
                />
                <label htmlFor="total" data-error="Total is required">
                  Total
                </label>
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
  })
};

UserForm.defaultProps = {
  fileRequest: undefined,
  transcribe: undefined
};
