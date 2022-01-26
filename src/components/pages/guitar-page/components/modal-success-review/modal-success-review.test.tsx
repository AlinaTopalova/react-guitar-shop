import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import ModalSuccessReview from './modal-success-review';
import { ModalType } from 'constants/constants';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();

describe('Component: ModalSuccess', () => {

  it('should render correctly Component: ModalSuccess', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ModalSuccessReview onClose={onClose} modalType={ModalType.ModalSuccess}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за/i)).toBeInTheDocument();
  });
});
