import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import Footer from './footer';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Footer', () => {

  it('should render correctly Component: Footer', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Footer />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });
});
