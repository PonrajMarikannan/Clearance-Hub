import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Service from '../components/User/Service'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Text' ", () => {
  render(
    <Router>
      <Service />
    </Router>
  );
  const headingElement = screen.getByRole('text');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Content' ", () => {
  render(
    <Router>
      <Service />
    </Router>
  );
  const headingElement = screen.getByRole('content');
  expect(headingElement).toBeInTheDocument();
});
