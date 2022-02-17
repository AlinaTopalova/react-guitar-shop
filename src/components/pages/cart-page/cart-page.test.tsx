import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import CartPage from './cart-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CartPage', () => {

  it('should render correctly Component: CartPage', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <CartPage />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/В вашей корзине нет товаров/i))
      .toBeInTheDocument();
  });
});
