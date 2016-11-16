'use strict';

import React from 'react';
import Radium from 'radium';
import {VelocityComponent} from 'velocity-react';

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
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base}>
        <div style={style.base}>
            {/* малює трикутник*/}
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon
                        points={points}
                        style={style.arrow}
                    />
                </svg>
            </div>
        </div>
        <div style={style.base}>
            <button>fff</button>
        </div>
            </div>
    );
};

Toggle.propTypes = {
    style: React.PropTypes.object
};

const Header = (props) => {
    const style = props.style;
    return (
        <div style={style.base}>
            <div style={style.title}>
                {props.node.name}
            </div>
            <div style={style.title}>
                <button>fff22222</button>
            </div>
        </div>
    );
};

Header.propTypes = {
    style: React.PropTypes.object,
    node: React.PropTypes.object.isRequired
};

@Radium
class Container extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, decorators, terminal, onClick, node} = this.props;
        return (
            <div className="right">
                <div
                    className="right"
                    ref="clickable"
                    onClick={onClick}
                    style={style.container}>

                    { !terminal ? this.renderToggle() : null }
                    <decorators.Header
                        node={node}
                        style={style.header}
                    />

                </div>
                <div className="right">
                    <button>bt_decorator</button>
                </div>
            </div>

        );
    }
    renderToggle(){
        const animations = this.props.animations;
        if(!animations){ return this.renderToggleDecorator(); }
        return (
            <VelocityComponent ref="velocity"
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }
    renderToggleDecorator(){
        const {style, decorators} = this.props;
        return (<decorators.Toggle style={style.toggle}/>);
    }
}

Container.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]).isRequired,
    node: React.PropTypes.object.isRequired
};

export default {
    // Loading,
    Toggle,
    Header,
    Container
};
