import React, {Component, PropTypes} from 'react';
import {StyleRoot} from 'radium';
import {Treebeard, decorators} from '../../components';
import data from './data';
import styles from './styles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

class NodeViewer extends React.Component {
  static propTypes = {
    node: PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  render() {
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

export default
class Temp extends Component {

  constructor(props) {
    super(props);
    this.state = {data};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    /* позначає виділеним при кліку і забирає коли клікнуте іншу*/
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  render() {
    // const styles = require('../Categories/Categories.scss');
    return (
      <div>
        <h1>Temp</h1>
        {/* <button className={styles.refreshBtn + ' btn btn-success'}>*/}
          {/* <i className={'fa fa-refresh'}/> {' '} Temp*/}
        {/* </button>*/}

         <StyleRoot>
          <div style={styles.component} >
            <Treebeard
              data={this.state.data}
              onToggle={this.onToggle}
              decorators={decorators}
            />
          </div>
          <div style={styles.component}>
            <NodeViewer node={this.state.cursor}/>
          </div>
         </StyleRoot>

      </div>

    );
  }
}
