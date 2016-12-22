import {expect} from 'chai';
import convert from './../../category/convert';

describe('convert', () => {
  it('check if func convert correct build tree', () => {
    const mockData = [
      {'_id': 1, 'parentId': 0, 'name': '', 'properties': ''},
      {'_id': 4, 'parentId': 0, 'name': '', 'properties': ''},
      {'_id': 2, 'parentId': 1, 'name': '', 'properties': ''},
      {'_id': 3, 'parentId': 1, 'name': '', 'properties': ''}
    ];
    const result = [
      {'_id': 1, 'parentId': 0, 'name': '', 'properties': ''
        , 'children': [
                                  {'_id': 2, 'parentId': 1, 'name': '', 'properties': ''},
                                  {'_id': 3, 'parentId': 1, 'name': '', 'properties': ''}
                                ]
      },
      {'_id': 4, 'parentId': 0, 'name': '', 'properties': ''}
    ];

    expect(convert(mockData)).to.deep.equal(result);
  });
});

// describe('findParent', () => {
//   it('check if func findParent correct find parent of node', () => {
//     const mockData = [
//       {'_id': 1, 'parentId': 0},
//       {'_id': 2, 'parentId': 1},
//       {'_id': 3, 'parentId': 1},
//       {'_id': 4, 'parentId': 0}
//     ];
//     expect(findParents(2, mockData)).to.deep.equal([2, 1]);
//   });
// });
