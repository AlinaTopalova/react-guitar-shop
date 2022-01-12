import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarMock, store } from 'mock';
import GuitarCard from './guitarCard';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: GuitarCard', () => {

  it('should render correctly Component: GuitarCard', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <GuitarCard guitar={guitarMock} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
