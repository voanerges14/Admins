import * as CategoriesDB from './../../DbApi/Categories';
import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    CategoriesDB.addPropertyToCategory(req.body.id)
  });
}
