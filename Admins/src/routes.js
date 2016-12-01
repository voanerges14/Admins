import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded } from 'redux/modules/auth';
import {
    App,
    Chat,
    Widgets,
    About,
    Orders,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Home,
    Categories,
    Temp,
  } from 'containers';


export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      // debugger;
      const { auth: { user }} = store.getState();
      // console.log( 'users:  ', store.getState() );
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
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="about" component={About}/>
        <Route path="survey" component={Survey}/>
        <Route path="widgets" component={Widgets}/>

        <Route path="categories" component={Categories}/>
        <Route path="temp" component={Temp}/>
        <Route path="orders" component={Orders}/>
      </Route>


      { /* Routes */ }
       <Route path="login" component={Login}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
