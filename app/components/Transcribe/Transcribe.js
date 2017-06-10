import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import createHistory from 'history/createHashHistory';
import List from './List';
import Details from './Details';
import styles from './Transcribe.css';

const history = createHistory();

export default class Transcribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: 'http://localhost:3002'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  componentDidMount() {
    $('select')
      .on('change', event => {
        const stateChanged = {};
        stateChanged[event.target.id] = event.target.value;
        this.setState(stateChanged);
      })
      .material_select();
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

  handleSelectItem(event, item) {
    history.push(`/transcribe/details/${item.md5}`);
    this.setState({
      md5: item.md5,
      contentType: item.contentType,
      userResult: {
        totalAmount: undefined,
        taxAmount: undefined,
        date: undefined,
        merchantName: undefined
      }
    });
    const benchmarkApiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3022'
      : 'https://api-benchmark.taggun.io';

    this.props.scanRequest(
      this.props.home.apikey,
      `${benchmarkApiUrl}/api/benchmark/v1/file/${item.md5}?apikey=${this.props.home.apikey}`,
      this.state.target,
      item.userIpAddress || item.callerIpAddress
    );
    event.preventDefault();
  }

  render() {
    const { list } = this.props.home;

    const DetailsPage = props => (
      <Details
        contentType={this.state.contentType}
        apikey={this.props.home.apikey}
        target={this.state.target}
        ocrResult={this.props.userForm.result}
        {...props}
      />
    );

    return (
      <div>
        <div>
          <div className={`${styles.topRow} row`}>
            <div className="input-field col s3 right">
              <select
                id="target"
                onChange={this.handleChange}
                value={this.state.target}
              >
                <option value="https://api.taggun.io">
                  https://api.taggun.io
                </option>
                <option value="https://api-s.taggun.io">
                  https://api-s.taggun.io
                </option>
                <option value="http://localhost:3002">
                  http://localhost:3002
                </option>
              </select>
              <label htmlFor="target">Target</label>
            </div>
          </div>
          <div className="row">
            <div className="col s3">
              <List
                list={list}
                onSelect={this.handleSelectItem}
                activeMd5={this.state.md5}
              />
            </div>
            <Switch>
              <Route path="/transcribe/details/:md5" render={DetailsPage} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

Transcribe.propTypes = {
  benchmarkListRequest: PropTypes.func,
  home: PropTypes.shape({
    apikey: PropTypes.string,
    list: PropTypes.array,
    error: PropTypes.string
  }),
  userForm: PropTypes.shape({
    result: PropTypes.object
  }),
  scanRequest: PropTypes.func
};

Transcribe.defaultProps = {
  benchmarkListRequest: undefined,
  home: {},
  userForm: {},
  scanRequest: undefined
};
