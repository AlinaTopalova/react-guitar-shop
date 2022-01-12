import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { GuitarType } from 'constants/constants';
import { store } from 'mock';
import Filters from './filters';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const onChange = jest.fn();

describe('Component: Filters', () => {

  it('should render Component: Filters', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Filters onFilterChange={onChange} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId(`${GuitarType.Acoustic}-checkbox`)).toBeInTheDocument();
    expect(screen.getByTestId(`${GuitarType.Electric}-checkbox`)).toBeInTheDocument();
    expect(screen.getByTestId(`${GuitarType.Ukulele}-checkbox`)).toBeInTheDocument();
  });
});

