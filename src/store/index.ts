import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { moviesReducer } from './movie.slice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, ...getDefaultMiddleware()],
});

export * from './movie.slice';
export * from './movie.service';
