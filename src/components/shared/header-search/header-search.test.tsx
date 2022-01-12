import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import HeaderSearch from './header-search';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: HeaderSearch', () => {

  it('should render correctly Component: HeaderSearch', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <HeaderSearch />
        </Router>,
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/что вы ищите/i)).toBeInTheDocument();
  });
});
