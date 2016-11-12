import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, Hello } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class HomeA extends Component {
  render() {
    const styles = require('./HomeA.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="HomeA"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
            <Hello />
            <p>
              <a className={styles.github} href="https://github.com/erikras/react-redux-universal-hot-example"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created and maintained by <a href="https://twitter.com/erikras" target="_blank">@erikras</a>.
            </p>
          </div>
        </div>


      </div>
    );
  }
}
