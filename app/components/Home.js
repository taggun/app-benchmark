// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="container" data-tid="container">
          <div className="row">
            <h1>TAGGUN BENCHMARK TOOL</h1>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input id="apikey" type="text" className="active" />
                  <label htmlFor="apikey">apikey</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
