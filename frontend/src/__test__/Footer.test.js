import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/User/Footer'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Rights' ", () => {
  render(
    <Router>
      <Footer />
    </Router>
  );
  const headingElement = screen.getByRole('rights');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Text' ", () => {
  render(
    <Router>
      <Footer />
    </Router>
  );
  const headingElement = screen.getByRole('text');
  expect(headingElement).toBeInTheDocument();
});
