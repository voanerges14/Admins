import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as showMe from 'redux/modules/hello';
import * as productAction from 'redux/modules/products';

@connect(
  state => ({
    show: state.hello.show
  }), {...showMe, ...productAction}
)
export default class Hello extends Component {
  static propTypes = {
    setCategoryId: PropTypes.func,
    show: PropTypes.bool,
    showM: PropTypes.func,
    _id: PropTypes.string
  };

  render() {
    const styles = require('./Hello.scss');
    const {show, showM, _id, setCategoryId} = this.props; // eslint-disable-line no-shadow

    const setId = () => {
      showM(show);
      setCategoryId(_id);
      return true;
    };

    return (
      <div>
        <button className={styles.helloButton} onClick={() => {setId();}}>
          {show ? <div>Properties</div> : <div>Products</div>}
        </button>
      </div>
    );
  }
}
