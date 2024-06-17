import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import{configureStore} from "@reduxjs/toolkit"
import LoanList from './LoanList';

const initialState = {
  auth: {
    email: 'test@example.com',
  },
  books: {
    list: [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
    ],
    status: 'idle',
  },
  loans: {
    list: [
      { id: 1, book: { title: 'Book 1', author: 'Author 1' }, loanDate: '2024-06-01T10:00:00Z' },
      { id: 2, book: { title: 'Book 2', author: 'Author 2' }, loanDate: '2024-06-02T11:00:00Z' },
    ],
    status: 'idle',
  },
};

describe('LoanList component', () => {
  test('renders loan list correctly', () => {
    const store = configureStore({
      reducer: {
        auth: (state = initialState.auth) => state,
        books: (state = initialState.books) => state,
        loans: (state = initialState.loans) => state,
      },
    });

    render(
      <Provider store={store}>
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
