import React from 'react';
import { render } from '@testing-library/react';
import { Search } from './Search';
import { MemoryRouter } from 'react-router-dom';

describe('Search', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<MemoryRouter initialEntries={["?search=123"]}><Search/></MemoryRouter>);

    expect(baseElement).toBeTruthy();
  });
});
