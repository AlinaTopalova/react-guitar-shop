import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { cartGuitarsMock, store } from 'mock';
import CartTotalPrice from './cart-total-price';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CartTotalPrice', () => {

  it('should render correctly Component: CartTotalPrice', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <CartTotalPrice guitars={cartGuitarsMock}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
  });
});
