import React from 'react';
import { MoviesList } from './components/MoviesList';
import { Route, Switch } from 'react-router';
import { NotFound } from './components/NotFound';

export const Routes = (
  <Switch>
    <Route path="/" exact component={MoviesList}/>
    <Route path="/404" component={NotFound}/>
    <Route path="*" component={NotFound}/>
  </Switch>
);
