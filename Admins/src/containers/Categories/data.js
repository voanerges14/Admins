export default {
  id: '0',
  name: 'react-treebeard',
  // toggled: true,
  children: [
    {
      id: '0',
      name: 'example',
      children: [
        {name: 'app.js'},
        {name: 'data.js'},
        {name: 'index.html'},
        {name: 'styles.js'},
        {name: 'webpack.config.js'}
      ]
    },
    {
      id: '0',
      name: 'example2',
      children: [
        {name: 'app.js'},
        {
          name: 'example3',
          children: [
            {name: 'app.js'},
            {name: 'data.js'},
            {name: 'index.html'},
            {name: 'styles.js'},
            {name: 'webpack.config.js'}
          ]
        },
        {name: 'data.js'},
        {name: 'index.html'},
        {name: 'styles.js'},
        {name: 'webpack.config.js'}
      ]
    },
    {
      id: '0',
      name: 'node_modules',
      // loading: true,
      children: [{
        name: 'components',
        children: [
          {name: 'decorators.js'},
          {name: 'treebeard.js'}
        ]
      }]
    },
    {
      id: '0',
      name: 'src',
      children: [
        {
          name: 'components',
          children: [
            {name: 'decorators.js'},
            {name: 'treebeard.js'}
          ]
        },
        {name: 'index.js'}
      ]
    },
    {
      id: '0',
      name: 'themes',
      children: [
        {name: 'animations.js'},
        {name: 'default.js'}
      ]
    },
    {name: 'Gulpfile.js'},
    {name: 'index.js'},
    {name: 'package.json'}
  ]
};
