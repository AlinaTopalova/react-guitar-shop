import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import { axiosInstance } from 'api';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import GuitarPage from './guitar-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { store } from 'mock';

const api = axiosInstance;
const history = createMemoryHistory();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

test('landing on a bad page', async() => {

  history.push('/guitars/1');
  render(
    <Provider store={mockStore(store)}>
      <Router history={history} >
        <GuitarPage />
      </Router>
    </Provider>,
  );

  expect(screen.getByText(/в корзину/i)).toBeInTheDocument();
  expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
});
