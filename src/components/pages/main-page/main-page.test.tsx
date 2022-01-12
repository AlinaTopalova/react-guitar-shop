import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import MainPage from './main-page';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('Component: MainPage', () => {

  it('should render Component: MainPage', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <MainPage />
        </Router>,
      </Provider>,
    );


    expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });
});
