import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import UserForm from './UserForm';
import FileViewer from './FileViewer';
import styles from './Transcribe.css';

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
    $('select').material_select();
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
    this.setState({
      md5: item.md5,
      contentType: item.contentType
    });
    const benchmarkApiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3022'
      : 'https://api-benchmark.taggun.io';
    this.props.scanRequest(this.props.home.apikey, `${benchmarkApiUrl}/api/benchmark/v1/file/${item.md5}?apikey=${this.props.home.apikey}`, this.state.target);
    event.preventDefault();
  }

  render() {
    const { list } = this.props.home;
    return (
      <div>
        <div>
          <div className={`${styles.topRow} row`}>
            <div className="input-field col s3 right">
              <select id="target" onChange={this.handleChange} value={this.state.target}>
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
              <List list={list} onSelect={this.handleSelectItem} />
            </div>
            <div className="col s4">
              <FileViewer
                apikey={this.props.home.apikey}
                md5={this.state.md5}
                contentType={this.state.contentType}
              />
            </div>
            <div className="col s5">
              <UserForm
                apikey={this.props.home.apikey}
                md5={this.state.md5}
                target={this.state.target}
                result={this.props.userForm.result}
              />
            </div>
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
  userForm: PropTypes.object,
  scanRequest: PropTypes.func
};

Transcribe.defaultProps = {
  benchmarkListRequest: undefined,
  home: undefined,
  userForm: {},
  scanRequest: undefined
};
