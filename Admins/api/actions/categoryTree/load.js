const initialCategories = {
  idD: '0',
  name: 'react-treebeard',
  // toggled: true,
  children: [
    {
      idD: '1',
      name: 'example',
      children: [
        {idD: '3', name: 'app.js'},
        {idD: '4', name: 'data.js'},
        {idD: '5', name: 'index.html'},
        {idD: '6', name: 'styles.js'},
        {idD: '7', name: 'webpack.config.js'}
      ]
    },
    {
      idD: '8',
      name: 'example2',
      children: [
        {idD: '9', name: 'app.js'},
        {
          idD: '10', name: 'example333333',
          children: [
            {idD: '11', name: 'app.js'},
            {idD: '12', name: 'data.js'},
            {idD: '13', name: 'index.html'},
            {idD: '14', name: 'styles.js'},
            {idD: '15', name: 'webpack.config.js'}
          ]
        },
        {idD: '16', name: 'data.js'},
        {idD: '17', name: 'index.html'},
        {idD: '18', name: 'styles.js'},
        {idD: '19', name: 'webpack.config.js'}
      ]
    },
    {
      idD: '20',
      name: 'node_modules',
      // loading: true,
      children: [{
        idD: '21',name: 'components',
        children: [
          {idD: '22',name: 'decorators.js'},
          {idD: '23',name: 'treebeard.js'}
        ]
      }]
    },
    {
      idD: '24',
      name: 'src',
      children: [
        {
          idD: '25',name: 'components',
          children: [
            {idD: '26', name: 'decorators.js'},
            {idD: '27', name: 'treebeard.js'}
          ]
        },
        {idD: '28', name: 'index.js'}
      ]
    },
    {
      idD: '29',
      name: 'themes',
      children: [
        {idD: '30', name: 'animations.js'},
        {idD: '31', name: 'default.js'}
      ]
    },
    {idD: '32', name: 'Gulpfile.js'},
    {idD: '33', name: 'index.js'},
    {idD: '33', name: 'package.json'}
  ]
};

export function getCategories(req) {
  let categories = req.session.categories;
  if (!categories) {
    categories = initialCategories;
    req.session.categories = categories;
  }
  return categories;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      try {
        resolve(getCategories(req));
      } catch(e) {
        reject('Categories load fails 33% of the time. You were unlucky.');
      }
    }, 1000); // simulate async load
  });
}
