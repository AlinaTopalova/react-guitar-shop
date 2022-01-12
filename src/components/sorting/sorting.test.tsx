import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { SortType } from 'constants/constants';
import { store } from 'mock';
import Sorting from './sorting';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const onChange = jest.fn();

describe('Component: Sorting', () => {

  it('should render correctly Component: Sorting', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Sorting onSortingChange={onChange} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should render correctly when user changes sort', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Sorting onSortingChange={onChange} />
        </Router>,
      </Provider>,
    );
    userEvent.click(screen.getByTestId(SortType.Price));
    expect(onChange).toBeCalledTimes(1);
    fireEvent.click(screen.getByText(/по цене/i));
    expect(onChange).toHaveBeenCalled();
  });
});
