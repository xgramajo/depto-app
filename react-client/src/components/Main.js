import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewsForm from './NewsForm';
import NewsCard from './NewsCard';
/*import Login from './Login';
<Route exact path='/login' component={Login}></Route>*/
const Main = () => (
  <BrowserRouter>
    <Switch>
      
      <Route exact path='/news' component={NewsCard}></Route>
      <Route exact path='/news/create-news' component={NewsForm}></Route>
    </Switch>
  </BrowserRouter>
  );

export default Main