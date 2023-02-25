import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { MovieCard } from './MovieCard';
import React from 'react';

describe('MovieCard', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should render successfully', () => {
    useSelectorMock.mockReturnValue(null);

    const { baseElement } = render(<MovieCard key='33' movieId='33'></MovieCard>);

    expect(baseElement).toBeTruthy();
  });

});
