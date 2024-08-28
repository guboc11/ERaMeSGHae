import { render, screen } from '@testing-library/react';
import * as Button from '@mui/material/Button'
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
