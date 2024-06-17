import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Actions from './Actions';

const mockStore = configureStore([]);

describe('Actions component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        email: 'test@example.com',
      },
      loans: {
        list: [],
        status: 'idle',
      },
      books: {
        list: [],
        status: 'idle',
      },
    });
  });

  test('renders actions correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Actions id={1} />
        </Router>
      </Provider>
    );

    const editLink = getByText('Edit');
    const deleteButton = getByText('Delete');
    const loanButton = getByText('Loan');

    expect(editLink).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(loanButton).toBeInTheDocument();
  });

  test('dispatches deleteBook action when delete button is clicked', async () => {
    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Actions id={1} />
        </Router>
      </Provider>
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
