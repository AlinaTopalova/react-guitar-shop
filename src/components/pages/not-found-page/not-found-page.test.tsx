import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: NotFoundPage', () => {

  it('should render correctly Component: NotFoundPage', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <NotFoundPage />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/We are sorry, Page not found!/i)).toBeInTheDocument();
  });
});
