import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as showMe from 'redux/modules/hello';

@connect(
  state => ({
    show: state.hello.show
  }), {...showMe}
)
export default class Hello extends Component {
  static propTypes = {
    show: PropTypes.bool,
    // message: PropTypes.string,
    showM: PropTypes.func
  };

  render() {
    const styles = require('./Hello.scss');
    const {show, showM} = this.props; // eslint-disable-line no-shadow

    return (
      <div>
        <button className={styles.helloButton} onClick={() => {showM(show);}}>
          {show ? <div>Properties</div> : <div>Products</div>}
        </button>
      </div>
    );
  }
}
