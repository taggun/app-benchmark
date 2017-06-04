import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apikey: '',
      error: '',
      list: []
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
    this.props.benchmarkListRequest(this.state.apikey);
    event.preventDefault();
  }

  render() {
    const { error } = this.props.home;
    return (
      <div className={styles.landing}>
        <div data-tid="container">
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col s6">
                  <h2 className="col s12">TAGGUN BENCHMARK TOOL</h2>
                  <div className="input-field col s12">
                    <input
                      required="true"
                      id="apikey"
                      type="text"
                      className="active validate"
                      placeholder="enter your apikey here"
                      value={this.state.apikey}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="apikey" data-error="apikey is required">API KEY</label>
                    {
                      error ?
                        <span className="red-text">{error}</span>
                        : ''
                    }
                  </div>
                </div>
                <div className="col s2">
                  <input type="submit" value="Login" className="btn-large" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  benchmarkListRequest: PropTypes.func,
  home: PropTypes.shape({
    apikey: PropTypes.string,
    list: PropTypes.array,
    error: PropTypes.string
  })
};

Home.defaultProps = {
  benchmarkListRequest: undefined,
  home: {
    apikey: '',
    list: [],
    error: ''
  }
};
