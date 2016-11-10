/*  eslint no-unused-expressions:0  */

'use strict';

const sinon = require('sinon');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const VelocityComponent = require('velocity-react').VelocityComponent;
const defaultDecorators = require('../../../src/components/decorators');
const factory = require('../utils/factory');

const defaults = {
    style: {},
    node: { children: [] },
    animations: { toggle: {} },
    terminal: false,
    decorators: factory.createDecorators(),
    onClick: function(){}
};

const Container = defaultDecorators.Container;

describe('container decorator component', () => {
    it('should render a clickable element with a click event handler', () => {
        const onClick = sinon.spy();
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                onClick={onClick}
            />
        );
        const clickable = container.refs.clickable;
        TestUtils.Simulate.click(clickable);
        onClick.should.be.called.once;
    });

    it('should render the toggle decorator not terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                terminal={false}
            />
        );
        const toggle = TestUtils.findRenderedComponentWithType(container, toggleType);
        toggle.should.exist;
    });

    it('should not render the toggle decorator if the node is terminal', () => {
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                terminal={true}
            />
        );
        const toggle = TestUtils.scryRenderedComponentsWithType(container, toggleType);
        toggle.should.be.empty;
    });

    it('should pass the style to the toggle decorator', () => {
        const style = { toggle: { color: 'red' } };
        const toggleType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ toggle: toggleType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                style={style}
            />
        );
        const toggle = TestUtils.findRenderedComponentWithType(container, toggleType);
        toggle.props.style.should.equal(style.toggle);
    });

    it('should render the toggle decorator in a velocity component', () => {
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}/>
        );
        const component = TestUtils.findRenderedComponentWithType(container, VelocityComponent);
        component.should.exist;
    });

    it('should not render a velocity component if animations is false', () => {
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                animations={false}
            />
        );
        const velocity = container.refs.velocity;
        global.should.not.exist(velocity);
    });

    it('should render a velocity component if animations is an object', () => {
        const animations = factory.createAnimations();
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                animations={animations}
            />
        );
        const velocity = container.refs.velocity;
        velocity.should.exist;
    });

    it('should pass velocity the toggle animation and duration props', () => {
        const animations = { toggle: { duration: 1, animation: 'slideUp' } };
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                animations={animations}
            />
        );
        const velocity = container.refs.velocity;
        velocity.props.duration.should.equal(animations.toggle.duration);
        velocity.props.animation.should.equal(animations.toggle.animation);
    });

    it('should render the header decorator', () => {
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(container, headType);
        head.should.exist;
    });

    it('should pass the node and style to the header decorator', () => {
        const style = { header: { color: 'red' } };
        const node = { name: 'terminal-node' };
        const headType = React.createClass({ render: () => <div/> });
        const decorators = factory.createDecorators({ header: headType });
        const container = TestUtils.renderIntoDocument(
            <Container {...defaults}
                decorators={decorators}
                node={node}
                style={style}
            />
        );
        const head = TestUtils.findRenderedComponentWithType(container, headType);
        head.props.style.should.equal(style.header);
        head.props.node.should.equal(node);
    });
});
