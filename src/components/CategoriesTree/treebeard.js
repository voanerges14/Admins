import React, {Component, PropTypes} from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from './themes/default';
import defaultAnimations from './themes/animations';

export default
class TreeBeard extends Component {
  static propTypes = {
    style: PropTypes.object,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    animations: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    onToggle: PropTypes.func,
    onAddToggle: PropTypes.func,
    onEditToggle: PropTypes.func,
    onRemoveToggle: PropTypes.array,
    loadProducts: PropTypes.func,
    decorators: PropTypes.object
  };

  static defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators
  };

  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
    if (!Array.isArray(data)) { data = [data]; }
    // data.map((node, index)=> console.log('node.id: ' + data.node.id + ' index: ' + index));
    return (
    <ul style={this.props.style.tree.base} ref="treeBase">
        {data.map((node, index) =>
          <TreeNode
            key={index || node._id}
            node={node}
            onToggle={this.props.onToggle}
            onAddToggle={this.props.onAddToggle}
            onEditToggle={this.props.onEditToggle}
            onRemoveToggle={this.props.onRemoveToggle}
            loadProducts={this.props.loadProducts}
            animations={this.props.animations}
            decorators={this.props.decorators}
            style={this.props.style.tree.node}
          />
        )}
      </ul>
    );
  }
}
