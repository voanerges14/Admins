import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {VelocityComponent} from 'velocity-react';
//
// const Loading = (props) => {
//     return (
//         <div style={props.style}>
//             loading...
//         </div>
//     );
// };
//
// Loading.propTypes = {
//     style: React.PropTypes.object
// };
const Toggle = (props) => {
  const style = props.style;
  const height = style.height;
  const width = style.width;
  const midHeight = height * 0.5;
  const points = `0,0 0, ${height} ${width}, ${midHeight}`;
  return (
    <div style={style.base}>
      <div style={style.wrapper}>
        <svg height={height} width={width}>
          <polygon
            points={points}
            style={style.arrow}
          />
        </svg>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  style: PropTypes.object
};

const Header = (props) => {
  const style = props.style;
  return (
    <div style={style.base}>
      <div style={style.title}>
        {props.node.name}
      </div>
    </div>
  );
};

Header.propTypes = {
  style: React.PropTypes.object,
  node: React.PropTypes.object.isRequired
};

@Radium
class Container extends Component {
  constructor(props) {
    super(props);
  }


  renderToggle() {
    const animations = this.props.animations;
    if (!animations) {
      return this.renderToggleDecorator();
    }
    return (
      <VelocityComponent ref="velocity"
                         duration={animations.toggle.duration}
                         animation={animations.toggle.animation}>
        {this.renderToggleDecorator()}
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const {style, decorators} = this.props;
    return (<decorators.Toggle style={style.toggle}/>);
  }


  render() {
    const {style, decorators, terminal, onClick, node} = this.props;
    // const mystyle = require('./../Products.scss');
    const mystyle = require('./../../containers/Categories/Categories.scss');

    /* className="form-group form-inline" */
    return (
      <div className={mystyle.mycell} >
        <div
          ref="clickable"
          onClick={onClick}
          style={style.container}>

          { !terminal ? this.renderToggle() : null }
          <decorators.Header
            node={node}
            style={style.header}

          />
        </div>
      </div>
    );
  }
}

Container.propTypes = {
  style: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  terminal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  animations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  node: PropTypes.object.isRequired
};

export default {
  // Loading,
  Toggle,
  Header,
  Container
};
