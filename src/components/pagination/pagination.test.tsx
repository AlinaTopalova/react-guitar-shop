import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import Pagination from './pagination';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const onPageChange = jest.fn();
const defaultPagination = {
  start: 0,
  end: 9,
};
const size = 9;
const total = 27;

describe('Component: Pagination', () => {

  it('should render Component: Pagination', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Pagination
            onPageChange={onPageChange}
            pagination={defaultPagination}
            size={size}
            total={total}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/1/i));
    expect(onPageChange).toHaveBeenCalled();
  });
});
