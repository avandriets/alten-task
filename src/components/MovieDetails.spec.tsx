import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import React from 'react';
import { MovieDetails } from './MovieDetails';

describe('MovieDetails', () => {
  let fetchFn = jest.fn(() => null);
  const state = {
    status: {
      resolved: false,
      rejected: false,
      pending: false,
      err: null,
    },
    total: 0,
    getTitle: () => 'Hello',
    getPoster: () => 'Hello',
    getPlot: () => 'Hello',
    getAwards: () => 'Hello',
    getActors: () => ['Hello'],
    getYear: () => '1999',
    getImdbRating: () => 22,
  };

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should render successfully', () => {
    useSelectorMock.mockReturnValue(state);
    useDispatchMock.mockImplementation(() => fetchFn as any);

    const { baseElement } = render(
      <MovieDetails></MovieDetails>
    );

    expect(baseElement).toBeTruthy();
  });

});
