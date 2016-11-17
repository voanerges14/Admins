'use strict';

export default {
    name: 'react-treebeard',
    toggled: true,
    children: [
        {
            name: 'example',
            children: [
                { name: 'app.js' },
                { name: 'data.js' },
                { name: 'index.html' },
                { name: 'styles.js' },
                { name: 'webpack.config.js' }
            ]
        },
        {
            name: 'example2',
            children: [
                { name: 'app.js' },
                {
                    name: 'example3',
                    children: [
                        { name: 'app.js' },
                        { name: 'data.js' },
                        { name: 'index.html' },
                        { name: 'styles.js' },
                        { name: 'webpack.config.js' }
                    ]
                },
                { name: 'data.js' },
                { name: 'index.html' },
                { name: 'styles.js' },
                { name: 'webpack.config.js' }
            ]
        },
        {
            name: 'node_modules',
            // loading: true,
            children: [{
                name: 'components',
                children: [
                    { name: 'decorators.js' },
                    { name: 'treebeard.js' }
                ]
            }]
        },
        {
            name: 'src',
            children: [
                {
                    name: 'components',
                    children: [
                        { name: 'decorators.js' },
                        { name: 'treebeard.js' }
                    ]
                },
                { name: 'index.js' }
            ]
        },
        {
            name: 'themes',
            children: [
                { name: 'animations.js' },
                { name: 'default.js' }
            ]
        },
        { name: 'Gulpfile.js' },
        { name: 'index.js' },
        { name: 'package.json' }
    ]
};
