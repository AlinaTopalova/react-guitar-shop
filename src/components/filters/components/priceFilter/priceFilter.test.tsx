import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import PriceFilter from './priceFilter';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const onChange = jest.fn();

describe('Component: PriceFilter', () => {

  it('should render price max and min', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <PriceFilter
            maxPriceLimit={1700}
            minPriceLimit={35000}
            onChange={onChange}
            priceValue={['5000', '25000']}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1700')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('35000')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('min-price'), '4000');
    expect(screen.getByDisplayValue(/4000/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('max-price'), '8000');
    expect(screen.getByDisplayValue(/8000/i)).toBeInTheDocument();
  });
});

