import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarToBuyMock, store } from 'mock';
import ProductToBy from './productToBy';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClick = jest.fn();


describe('Component: ProductToBy', () => {

  it('should render correctly Component: ProductToBy', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ProductToBy product={guitarToBuyMock} onClick={onClick}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
