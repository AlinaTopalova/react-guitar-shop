import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import CartCoupon from './cart-coupon';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CartCoupon', () => {

  it('should render correctly Component: CartCoupon', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <CartCoupon />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });
});
