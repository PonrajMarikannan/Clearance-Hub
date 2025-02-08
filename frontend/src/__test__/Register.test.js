import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Create Account' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('heading');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Username' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('Username');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Email' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('email');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Password' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('Password');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'ConfirmPassword' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('cpass');
  expect(headingElement).toBeInTheDocument();
});



it("renders 'login' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('login');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Button' ", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const headingElement = screen.getByRole('button', { name: /Register/i });
  expect(headingElement).toBeInTheDocument();
});