import React from 'react';
import { render } from '@testing-library/react';

import { Pending } from './Pending';

describe('Pending', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pending/>);

    expect(baseElement).toBeTruthy();
  });
});
