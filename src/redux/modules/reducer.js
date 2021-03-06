import {combineReducers} from 'redux';
import multireducer from 'multireducer';
import {routerReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import hello from './hello';

import categories from './categories';
import orders from './orders';
import users from './users';
import products from './products';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  // authA,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  hello,

  categories,
  orders,
  users,
  products
});
