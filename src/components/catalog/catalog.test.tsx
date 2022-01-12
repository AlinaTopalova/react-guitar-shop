import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import Catalog from './catalog';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Component: FavoritesPage', () => {

  it('should render all favorites places', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Catalog />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
  });
});


