// юзає header.js
import React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import {CategoryAdd} from 'components';
import NodeHeader from './header';
// import {deleteStart} from '../../redux/modules/categories';
class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMinusClick = this.onMinusClick.bind(this);
    this.onPlusClick = this.onPlusClick.bind(this);
  }

  onClick() {
    const toggled = !this.props.node.toggled;
    const onToggle = this.props.onToggle;
    if (onToggle) {
      onToggle(this.props.node, toggled);
    }
  }

  onMinusClick() {
    // <CategoriesForm formKey={String(prop.id)} key={String(prop.id)} initialValues={prop}/>);
    console.log('Hello World Minus===>');
  }

  onPlusClick() {
    // <CategoriesForm formKey={String(prop.id)} key={String(prop.id)} initialValues={prop}/>);
    console.log('Hello World Plus===>');
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
    return {onToggle: this.props.onToggle};
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
    const styles = require('../../containers/Temp/Temp.scss');
    return (
      <div className={styles.mybutton}>
        <NodeHeader
          decorators={decorators}
          animations={animations}
          style={this.props.style}
          node={Object.assign({}, this.props.node)}
          onClick={this.onClick}/>
        <div className={styles.mycell}>
          <button className="btn btn-link btn-xs" onClick={this.onPlusClick}>
            <span className="glyphicon glyphicon-plus"/></button>
        </div>
        <div className={styles.mycell}>
          <button className="btn btn-link btn-xs" onClick={this.onMinusClick}>
            <span className="glyphicon glyphicon-minus"/></button>
        </div>
         <div className={styles.mycell}>
            <CategoryAdd formKey="1" key="1" initialValues="1"/>
         </div>
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
  style: React.PropTypes.object.isRequired,
  node: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object.isRequired,
  animations: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool
  ]).isRequired,
  onToggle: React.PropTypes.func

  // handleAdd: React.PropTypes.func.isRequired,
  // handleRemove: React.PropTypes.func.isRequired,

};

export default TreeNode;
