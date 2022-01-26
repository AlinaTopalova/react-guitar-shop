import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarMock, store } from 'mock';
import Description from './description';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ModalSuccess', () => {

  it('should render correctly Component: ModalSuccess', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Description currentGuitar={guitarMock} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
  });
});
