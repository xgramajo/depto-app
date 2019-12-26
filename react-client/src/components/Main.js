import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewsForm from './NewsForm';
import NewsCard from './NewsCard';

//<Route exact path='/' component={Home}></Route>

const Main = () => (
    <Switch>
      
      <Route exact path='/news' component={NewsCard}></Route>
      <Route exact path='/news/create-news' component={NewsForm}></Route>
    </Switch>
  );

export default Main