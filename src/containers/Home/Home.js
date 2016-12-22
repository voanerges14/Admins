import React, { Component } from 'react';
import {LoginForm} from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const logoImage = require('./logo.png');
    return (
        <div className={styles.home}>
          <Helmet title="Home"/>
          <div className={styles.masthead}>
            <div className="container">
              <div className={styles.logo}>
                <p>
                  <img src={logoImage}/>
                </p>
              </div>
              <h1>{config.app.title}</h1>
              <h2>{config.app.description}</h2>
              <LoginForm />
            </div>
          </div>
        </div>
    );
  }
}
