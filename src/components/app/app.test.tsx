import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute } from 'constants/constants';
import App from './app';
import { store } from 'mock';
import { axiosInstance } from 'api';

const api = axiosInstance;
const history = createMemoryHistory();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('Application Routing', () => {

  it('should render "Main-Page" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
  });

  it('should render "Not-Found-Page" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('We are sorry, Page not found!')).toBeInTheDocument();
  });
});
