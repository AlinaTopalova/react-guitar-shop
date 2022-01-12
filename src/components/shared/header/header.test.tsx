import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import Header from './header';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Header', () => {

  it('should render correctly Component: Header', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Header />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
  });
});
