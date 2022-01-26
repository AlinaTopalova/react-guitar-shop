import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarMock, store } from 'mock';
import { ModalType } from 'constants/constants';
import ModalReview from './modal-review';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();

describe('Component: ModalNewReview', () => {

  it('should render correctly Component: ModalNewReview', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ModalReview onClose={onClose} modalType={ModalType.ModalNewReview} currentGuitar={guitarMock}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Ваша оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
  });
});
