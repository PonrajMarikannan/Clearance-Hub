import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Log In' ", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const headingElement = screen.getByRole('heading', { name: /Log In/i });
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Email' ", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const headingElement = screen.getByLabelText('Email');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Password' ", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const headingElement = screen.getByLabelText('Password');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Reg' ", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const headingElement = screen.getByRole('ques');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Button' ", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const headingElement = screen.getByRole('button', { name: /Log In/i });
  expect(headingElement).toBeInTheDocument();
});