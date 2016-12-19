import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded } from 'redux/modules/auth';
import {
    App,
    About,
    Widgets,
    Orders,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Home,
    Categories,
    Users,
    Products
  } from 'containers';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      console.log('user ' + user);
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }

      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        {/* <Route path="chat" component={Chat}/>*/}
        <Route path="loginSuccess" component={LoginSuccess}/>
         <Route path="about" component={About}/>
        <Route path="survey" component={Survey}/>
        <Route path="widgets" component={Widgets}/>

        <Route path="categories" component={Categories}/>
        <Route path="orders" component={Orders}/>
        <Route path="users" component={Users}/>
        <Route path="products" component={Products}/>

      </Route>


      { /* Routes */ }
       <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
