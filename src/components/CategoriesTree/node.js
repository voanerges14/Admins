// юзає header.js
// import React from 'react';
import React, {Component, PropTypes} from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
// import {CategoryAdd} from 'components';
import NodeHeader from './header';
// import {connect} from 'react-redux';
// import * as categoryActions from 'redux/modules/categories';
// import {asyncConnect} from 'redux-async-connect';
// import {isLoaded, load as loadCategories} from 'redux/modules/categories';

// @asyncConnect([{
//   deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!isLoaded(getState())) {
//       return dispatch(loadCategories());
//     }
//   }
// }])
// debugger;
// @connect(
//   state => ({
//     categories: state.categories.data,
//     // categoryTreeState: state.categories.categoryTreeState,
//     // editing: state.categories.editing,
//     // adding: state.categories.adding,
//     // deleting: state.categories.deleting
//   }))

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    // this.onMinusClick = this.onMinusClick.bind(this);
    // this.onPlusClick = this.onPlusClick.bind(this);
    // debugger;
  }

  onClick() {
    debugger;
    const toggled = !this.props.node.toggled;
    const onToggle = this.props.onToggle;
    const loadProducts = this.props.loadProducts;
    const id = this.props.node._id;
    if (onToggle) {
      onToggle(this.props.node, toggled);
      loadProducts(id);
    }
  }

  // onClick() {
  //   const toggled = !this.props.node.toggled;
  //   const onToggle = this.props.onToggle;
  //   const temp = this.props.toggledChange;
  //   const state = this.props.categoryTreeState;
  //   const id = this.props.node._id;
  //   const oldState = (typeof state[id] === 'undefined') ? false : state[id];
  //   temp(id, oldState);
  //
  //   if (onToggle) {
  //     onToggle(this.props.node, toggled);
  //   }
  // }

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
    console.log('3) renderDrawer()');
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
        <div className={styles.mycell}>
          <button className="btn btn-link btn-xs" onClick={() => onAddToggle(this.props.node)}>
            <span className="glyphicon glyphicon-plus"/></button>
        </div>
        <div className={styles.mycell}>
          <button className="btn btn-link btn-xs" onClick={() => onRemoveToggle(this.props.node)}>
            <span className="glyphicon glyphicon-minus"/></button>
        </div>
        <div className={styles.mycell}>
          <button className="btn btn-link btn-xs" onClick={() => onEditToggle(this.props.node)}>
            <span className="glyphicon glyphicon-edit"/></button>
        </div>
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
            key={child.id || index}
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
    // debugger;
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
    // debugger;
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
  toggledChange: PropTypes.func.isRequired,

  categoryTreeState: PropTypes.bool.isRequired,
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
  onRemoveToggle: PropTypes.func,
  loadProducts: PropTypes.func,
  categories: PropTypes.array,
  addStartCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default TreeNode;
