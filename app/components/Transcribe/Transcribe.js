import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import UserForm from './UserForm';
import FileViewer from './FileViewer';
// import styles from './Transcribe.css';

export default class Transcribe extends Component {

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
    this.props.benchmarkListRequest(this.state.apikey);
    event.preventDefault();
  }

  render() {
    const { list } = this.props.home;
    return (
      <div>
        <div>
          <div className="row">
            <div className="col s3">
              <List list={list} />
            </div>
            <div className="col s5">
              <FileViewer />
            </div>
            <div className="col s4">
              <UserForm />
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
  })
};

Transcribe.defaultProps = {
  benchmarkListRequest: undefined,
  home: undefined
};
