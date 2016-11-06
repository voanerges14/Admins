import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {showMessage} from 'redux/modules/hello';

@connect(
  (state) => ({... state.hello}),
  {showMessage}
)
export default class Hello extends Component {
  static propTypes = {
    show: PropTypes.bool,
    message: PropTypes.string,
    showMessage: PropTypes.func
  }

  render() {
    const styles = require('./Hello.scss');
    const {show, message, showMessage} = this.props; // eslint-disable-line no-shadow

    return (<div>
        {show && <h1>{message}</h1>}
        <button className={styles.helloButton} onClick={() => showMessage(!show)}>
          {!show ? 'Show Hello!' : 'Hide hello'}
        </button>
      </div>
    );
  }
}
