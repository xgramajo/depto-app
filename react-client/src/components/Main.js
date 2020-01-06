import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewsForm from './NewsForm';
import NewsCard from './NewsCard';
import Login from './Login';

const Main = () => (
    <Switch>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/news' component={NewsCard}></Route>
      <Route exact path='/news/create-news' component={NewsForm}></Route>
    </Switch>
  );

export default Main