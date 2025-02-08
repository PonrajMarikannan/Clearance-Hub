import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Exppayment from '../components/User/Exppayment'; 
import { BrowserRouter as Router } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

it("renders 'Button' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('btn');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Submit Button' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('btn-submit');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Amount' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('amnt');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'CVV' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('cvv');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'ExpDate' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('expdate');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Card Name' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('cardname');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'cardno' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('cardno');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Paymethod' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('paymethod');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Form Head' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('form-head');
  expect(headingElement).toBeInTheDocument();
});

it("renders 'Invoice' ", () => {
  render(
    <Router>
      <Exppayment />
    </Router>
  );
  const headingElement = screen.getByRole('invoice');
  expect(headingElement).toBeInTheDocument();
});

