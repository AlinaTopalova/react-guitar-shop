import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import Modal from './modal';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();

describe('Component: Modal', () => {

  it('should render correctly Component: Modal', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Modal onClose={onClose}>
            {<p></p>}
          </Modal>
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId('modal__overlay')).toBeInTheDocument();
  });
});
