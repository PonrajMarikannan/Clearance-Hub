import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Team from '../components/User/Teams'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Heading' ", () => {
  render(
    <Router>
      <Team />
    </Router>
  );
  const headingElement = screen.getByRole('team');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Text' ", () => {
  render(
    <Router>
      <Team />
    </Router>
  );
  const headingElement = screen.getByRole('text');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Head' ", () => {
  render(
    <Router>
      <Team />
    </Router>
  );
  const headingElement = screen.getByRole('head');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Name' ", () => {
  render(
    <Router>
      <Team />
    </Router>
  );
  const headingElement = screen.getByRole('name');
  expect(headingElement).toBeInTheDocument();
});




