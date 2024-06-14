import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import loanReducer, { fetchLoans, returnLoan } from '../features/tasks/loanSlice';
import booksReducer, { fetchBooks } from '../features/tasks/booksSlice';
import authReducer from '../features/tasks/authSlice';
import LoanList from './loanList';


const initialState = {
  auth: {
    user: { id: 1, name: 'Test User' },
  },
  books: {
    list: [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
    ],
  },
  loans: {
    list: [
      { id: 1, book: { title: 'Book 1', author: 'Author 1' }, loanDate: '2024-06-01T10:00:00Z' },
      { id: 2, book: { title: 'Book 2', author: 'Author 2' }, loanDate: '2024-06-02T11:00:00Z' },
    ],
    status: 'idle',
  },
};


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('LoanList component', () => {
  let dispatch;

  beforeEach(() => {

    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);


    useSelector.mockImplementation((selector) => selector(initialState));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loan list correctly', () => {
    render(
      <Provider store={configureStore({
        reducer: {
          auth: authReducer,
          books: booksReducer,
          loans: loanReducer,
        },
      })}>
        <LoanList />
      </Provider>
    );

    expect(screen.getByText('Loaned Books')).toBeInTheDocument();
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
  });


});
