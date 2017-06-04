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
      total: '',
      md5: '',
      contentType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
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
    event.preventDefault();
  }

  render() {
    const { list } = this.props.home;
    return (
      <div>
        <div>
          <div className="row">
            <div className="col s3">
              <List list={list} onSelect={this.handleSelectItem} />
            </div>
            <div className="col s5">
              <FileViewer
                apikey={this.props.home.apikey}
                md5={this.state.md5}
                contentType={this.state.contentType}
              />
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
