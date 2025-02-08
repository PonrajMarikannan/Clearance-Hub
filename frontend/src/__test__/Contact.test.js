import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../components/User/Contact'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Contact' ", () => {
  render(
    <Router>
      <Contact />
    </Router>
  );
  const headingElement = screen.getByRole('connect');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Content' ", () => {
  render(
    <Router>
      <Contact />
    </Router>
  );
  const headingElement = screen.getByRole('content');
  expect(headingElement).toBeInTheDocument();
});

