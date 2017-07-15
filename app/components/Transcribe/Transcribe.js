import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';
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
    this.saveRequest = this.saveRequest.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleBenchmarkClick = this.handleBenchmarkClick.bind(this);
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

  saveRequest(benchmark) {
    this.props.saveRequest(this.state.apikey, this.state.id, benchmark);
  }

  handleSelectItem(event, item) {
    history.push(`/transcribe/details/${item.md5}`);
    this.setState({
      id: item._id,
      md5: item.md5,
      contentType: item.contentType,
      userResult: item.benchmark
    });
    const benchmarkApiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3022'
      : 'https://api-benchmark.taggun.io';

    this.props.scanRequest(
      this.props.home.apikey,
      `${benchmarkApiUrl}/api/benchmark/v1/file/${item.md5}?apikey=${this.props.home.apikey}`,
      this.state.target,
      item.userIpAddress || item.callerIpAddress,
      item.md5
    );
    event.preventDefault();
  }

  handleRefreshClick() {
    this.props.benchmarkListRequest(this.props.home.apikey);
  }

  handleBenchmarkClick() {
    console.log('benchmark');
  }

  render() {
    const { list } = this.props.home;

    const DetailsPage = props => (
      <Details
        id={this.state.id}
        contentType={this.state.contentType}
        apikey={this.props.home.apikey}
        target={this.state.target}
        ocrResult={this.props.userForm.result}
        userForm={this.props.userForm}
        userResult={this.state.userResult}
        saveRequest={this.saveRequest}
        {...props}
      />
    );

    return (
      <div>
        <LoadingBar />
        <div>
          <div className={`${styles.topRow} row`}>
            <div className="input-field col s6 left">
              <button
                className="btn"
                onClick={this.handleRefreshClick}
              >Refresh</button>
              <button
                className="btn"
                onClick={this.handleBenchmarkClick}
              >Benchmark</button>
            </div>
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
            <div className="col s4 l3">
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
  saveRequest: PropTypes.func,
  home: PropTypes.shape({
    apikey: PropTypes.string,
    list: PropTypes.array,
    error: PropTypes.string,
  }),
  userForm: PropTypes.shape({
    result: PropTypes.object,
    error: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  scanRequest: PropTypes.func
};

Transcribe.defaultProps = {
  saveRequest: undefined,
  home: {},
  userForm: {},
  scanRequest: undefined
};
