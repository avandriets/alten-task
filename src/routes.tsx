import React from 'react';
import { MoviesList } from './components/MoviesList';
import { NotFound } from './components/NotFound';
import { Routes, Route } from 'react-router-dom';

export const routes = (
  <Routes>
    <Route path="/" element={<MoviesList/>}></Route>
    <Route path="/404" element={<NotFound/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
);
