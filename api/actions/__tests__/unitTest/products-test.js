import {expect} from 'chai';
import {findNode, findParents} from './../../products/products';

describe('findNode', () => {
  it('check if func findNode correct find node of parent', () => {
    const mockData = [
        {'_id': 1, 'parentId': 0},
        {'_id': 2, 'parentId': 1},
        {'_id': 3, 'parentId': 1},
        {'_id': 4, 'parentId': 0}
      ];
    expect(findNode(1, mockData)).to.deep.equal([1, 2, 3]);
  });
});

describe('findParent', () => {
  it('check if func findParent correct find parent of node', () => {
    const mockData = [
      {'_id': 1, 'parentId': 0},
      {'_id': 2, 'parentId': 1},
      {'_id': 3, 'parentId': 1},
      {'_id': 4, 'parentId': 0}
    ];
    expect(findParents(2, mockData)).to.deep.equal([2, 1]);
  });
});
