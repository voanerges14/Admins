/**
 * Created by pavlo on 09.11.16.
 */
import * as Db from './../../DbApi/Categories';

const initialCategories = [
  {id: 1, name: 'Laptop1',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 2, name: 'Laptop2',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 3, name: 'Laptop3', property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 4, name: 'Laptop4',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
  {id: 5, name: 'Laptop5',  property: [
    {name: 'color'},
    {name: 'some'},
    {name: 'some1'},
    {name: 'some2'},
    {name: 'some3'}
  ],},
];

function convert(nodes) {
  let map = {}, node, roots = [];
  for (let ii = 0; ii < nodes.length; ii++) {
    node = nodes[ii];
    node.children = [];
    console.log('##################');
    console.log('node.id: ' + node._id);
    map[node._id] = ii; // use map to look-up the parents
    if (node.parentId !== "0") {
      nodes[map[node.parentId]]['children'] = node;
      // nodes[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  console.log(roots);
  return roots;
}

let unflatten = function( array, parent, tree ){

  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { _id: 0 };

  let children = _.filter( array, function(child){ return child.parentId == parent._id; });

  if( !_.isEmpty( children )  ){
    if( parent._id == 0 ){
      tree = children;
    }else{
      parent['children'] = children
    }
    _.each( children, function( child ){ unflatten( array, child ) } );
  }
  console.log('###########################!');
console.log('unflatten ==>');
  console.log(tree);

  return tree;
};
//
// tree = unflatten( arr );
// document.body.innerHTML = "<pre>" + (JSON.stringify(tree, null, " "))


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
    // setTimeout(() => {
      try {
        // resolve(getCategories(req));
        Db.getCategories().then(data => {
          console.log('fdfsd' + data);
          // resolve(data);
          resolve(convert(data));
          // resolve(unflatten(data));
        });
      } catch(e) {
        reject('CategoriesOLD load fails 33% of the time. You were unlucky.');
      }
    // }, 1000); // simulate async load
  });
}
