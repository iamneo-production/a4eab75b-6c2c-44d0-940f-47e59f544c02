import { render, screen } from '@testing-library/react';
import Navbar from './components/navbar.component';

test('navbar test', () => {
  render(<Navbar />);
  const linkElement = screen.getByText(/News Reader/i);
  expect(linkElement).toBeInTheDocument();
});