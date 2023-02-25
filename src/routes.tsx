import React from 'react';
import { MoviesList } from './components/MoviesList';
import { NotFound } from './components/NotFound';
import { Routes, Route } from 'react-router-dom';
import { MovieDetails } from './components/MovieDetails';

export const routes = (
  <Routes>
    <Route path="/" element={<MoviesList/>}></Route>
    <Route path=":id" element={<MovieDetails/>}/>
    <Route path="/404" element={<NotFound/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
);
