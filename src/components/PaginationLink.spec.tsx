import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PaginationLink } from './PaginationLink';
import * as reactRedux from 'react-redux';

describe('Pagination', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should render successfully', () => {
    useSelectorMock.mockReturnValue(20);

    const { baseElement } = render(<MemoryRouter initialEntries={["?search=123"]}><PaginationLink/></MemoryRouter>);

    expect(baseElement).toBeTruthy();
  });
});
