import React from 'react';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { Error } from './Error';

describe('Error', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('should render successfully', () => {
    useSelectorMock.mockReturnValue({
      status: {
        resolved: false,
        rejected: true,
        pending: false,
        err: { message: 'Something went wrong.' },
      },
      total: 0,
    });

    const { baseElement } = render(<Error/>);

    expect(baseElement).toBeTruthy();
  });

  it('Shows error message', () => {
    const { getByText } = render(<Error/>)

    expect(getByText('Error')).not.toBeNull()
  });
});
