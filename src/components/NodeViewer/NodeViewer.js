import React, {Component, PropTypes} from 'react';
import styles from '../../containers/Categories/styles';

export default class NodeViewer extends Component {
  static propTypes = {
    node: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const HELP_MSG = 'Select A Node To See Its Data Structure Here...';
    const style = styles.viewer;
    let json = JSON.stringify(this.props.node, null, 4);
    if (!json) {
      json = HELP_MSG;
    }
    return (
      <div style={style.base}>
        {json}
      </div>
    );
  }
}
