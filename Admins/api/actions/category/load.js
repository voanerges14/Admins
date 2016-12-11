import * as CategoriesDb from './../../DbApi/Categories';
import convert from './convert';
const initialCategories = {
  id: '0',
  name: 'react-treebeard',
  property: [
    {id: '0', name: 'color'},
    {id: '1', name: 'some'},
    {id: '2', name: 'some1'},
    {id: '3', name: 'some2'},
    {id: '4', name: 'some3'}
  ],
  // toggled: true,
  children: [
    {
      id: '1',
      name: 'example',
      children: [
        {id: '3', name: 'app.js'},
        {id: '4', name: 'data.js'},
        {id: '5', name: 'index.html'},
        {id: '6', name: 'styles.js'},
        {id: '7', name: 'webpack.config.js'}
      ]
    },
    {
      id: '8',
      name: 'example2',
      children: [
        {id: '9', name: 'app.js'},
        {
          id: '10', name: 'example333333',
          children: [
            {id: '11', name: 'app.js'},
            {id: '12', name: 'data.js'},
            {id: '13', name: 'index.html'},
            {id: '14', name: 'styles.js'},
            {id: '15', name: 'webpack.config.js'}
          ]
        },
        {id: '16', name: 'data.js'},
        {id: '17', name: 'index.html'},
        {id: '18', name: 'styles.js'},
        {id: '19', name: 'webpack.config.js'}
      ]
    },
    {
      id: '20',
      name: 'node_modules',
      // loading: true,
      children: [{
        id: '21',name: 'components',
        children: [
          {id: '22',name: 'decorators.js'},
          {id: '23',name: 'treebeard.js'}
        ]
      }]
    },
    {
      id: '24',
      name: 'src',
      children: [
        {
          id: '25',name: 'components',
          children: [
            {id: '26', name: 'decorators.js'},
            {id: '27', name: 'treebeard.js'}
          ]
        },
        {id: '28', name: 'index.js'}
      ]
    },
    {
      id: '29',
      name: 'themes',
      children: [
        {id: '30', name: 'animations.js'},
        {id: '31', name: 'default.js'}
      ]
    },
    {id: '32', name: 'Gulpfile.js'},
    {id: '33', name: 'index.js'},
    {id: '33', name: 'package.json'}
  ]
};


export function getCategories(req) {
  let categories = req.session.categories;
  if (!categories) {
    categories = initialCategories;
    req.session.categories = categories;
  }
  return categories;
  // return CategoriesDb.getCategories();
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    CategoriesDb.getCategories().then(data => {
      resolve(convert(data));
      // resolve(data);
      // console.log("Categories Data: " + data);
    });
  });
  //   });
  // return new Promise((resolve, reject) => {
  //   // make async call to database
  //   setTimeout(() => {
  //     try {
  //       resolve(getCategories(req));
  //     } catch(e) {
  //       reject('CategoriesOLD load fails 33% of the time. You were unlucky.');
  //     }
  //   }, 0); // simulate async load
  // });
}
