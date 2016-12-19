// юзає header.js

import React, {Component, PropTypes} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import NodeHeader from './header';


class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const toggled = !this.props.node.toggled;
    const onToggle = this.props.onToggle;
    const loadProducts = this.props.loadProducts;
    const id = this.props.node._id;
    if (onToggle) {
      onToggle(this.props.node, toggled);
      loadProducts(id);
    }
  }

  animations() {
    const props = this.props;
    if (props.animations === false) {
      return false;
    }
    const anim = Object.assign({}, props.animations, props.node.animations);
    return {
      toggle: anim.toggle(this.props),
      drawer: anim.drawer(this.props)
    };
  }

  decorators() {
    // Merge Any Node Based Decorators Into The Pack
    const props = this.props;
    const nodeDecorators = props.node.decorators || {};
    return Object.assign({}, props.decorators, nodeDecorators);
  }

  _eventBubbles() {
    return {
      onToggle: this.props.onToggle,
      onAddToggle: this.props.onAddToggle,
      onEditToggle: this.props.onEditToggle,
      onRemoveToggle: this.props.onRemoveToggle,
      loadProducts: this.props.loadProducts
    };
  }


  renderDrawer(decorators, animations) {
    const toggled = this.props.node.toggled;
    if (!animations && !toggled) {
      return null;
    }
    if (!animations && toggled) {
      return this.renderChildren(decorators, animations);
    }
    return (
      <VelocityTransitionGroup {...animations.drawer} ref="velocity">
        {toggled ? this.renderChildren(decorators, animations) : null}
      </VelocityTransitionGroup>
    );
  }

  renderHeader(decorators, animations) {
    const styles = require('../../containers/Categories/Categories.scss');
    const {onAddToggle, onRemoveToggle, onEditToggle} = this.props;
    // debugger;
    return (
      <div className={styles.mybutton}>
        <NodeHeader
          decorators={decorators}
          animations={animations}
          style={this.props.style}
          node={Object.assign({}, this.props.node)}
          onClick={this.onClick}/>
        {onRemoveToggle[2].isActive && (onRemoveToggle[2].id === this.props.node._id) ?
          <div className={styles.mycell}>
            <button className="btn btn-link btn-xs" onClick={() => onRemoveToggle[1](this.props.node._id)}>
              <i className={'glyphicon glyphicon-ok'}/>
            </button>
            <button className="btn btn-link btn-xs" onClick={() => onRemoveToggle[3]()}>
              <i className="glyphicon glyphicon-remove"/>
            </button>
        </div> :
            <div className={styles.mycell}>
              <button className="btn btn-link btn-xs" onClick={() => onAddToggle(this.props.node._id)}>
                <span className="glyphicon glyphicon-plus"/></button>
              <button className="btn btn-link btn-xs" onClick={() => onRemoveToggle[0](this.props.node._id)}>
                <span className="glyphicon glyphicon-minus"/></button>
              <button className="btn btn-link btn-xs"
                      onClick={() => onEditToggle(this.props.node._id, this.props.node.name)}>
                <span className="glyphicon glyphicon-edit"/></button>
            </div>
          }
        {/* <div className={styles.mycell}>*/}
        {/* <CategoryAdd formKey="1" key="1" initialValues="1"/>*/}
        {/* </div>*/}
      </div>


    );
  }

  renderChildren(decorators) {
    if (this.props.node.loading) {
      return this.renderLoading(decorators);
    }
    let children = this.props.node.children;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    return (
      <ul style={this.props.style.subtree} ref="subtree">
        {children.map((child, index) =>
          <TreeNode
            {...this._eventBubbles()}
            key={child._id || index}
            node={child}
            decorators={this.props.decorators}
            animations={this.props.animations}
            style={this.props.style}
          />
        )}
      </ul>
    );
  }

  renderLoading(decorators) {
    return (
      <ul style={this.props.style.subtree}>
        <li>
          <decorators.Loading style={this.props.style.loading}/>
        </li>
      </ul>
    );
  }

  render() {
    const decorators = this.decorators();
    const animations = this.animations();
    return (
      <li style={this.props.style.base} ref="topLevel">
        {/* відповідає за сам вузол(папку/файл)*/}
        {this.renderHeader(decorators, animations)}
        {/* будує підвузли */}
        {this.renderDrawer(decorators, animations)}
      </li>
    );
  }

}

TreeNode.propTypes = {
  style: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  onToggle: PropTypes.func,
  onAddToggle: PropTypes.func,
  onEditToggle: PropTypes.func,
  onRemoveToggle: PropTypes.array,
  loadProducts: PropTypes.func,
  categories: PropTypes.array,
  // addStartCategory: PropTypes.func.isRequired,
  // deleteCategory: PropTypes.func.isRequired,
};

export default TreeNode;
