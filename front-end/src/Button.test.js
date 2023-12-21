// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

it('renders without crashing', () => {
  render(<Button>Click Me</Button>);
});

it('calls onClick prop when clicked', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
  fireEvent.click(getByText('Click Me'));
  expect(onClick).toHaveBeenCalledTimes(1); 
});