import { ActionType, LoadGuitarsCompleteAction, LoadGuitarsErrorAction, LoadGuitarsStartAction } from 'types/actions';
import { Guitar } from 'types/data';

const loadGuitarsStart = (): LoadGuitarsStartAction => ({
  type: ActionType.LoadGuitarsStart,
});

const loadGuitarsComplete = (guitars: Guitar[]): LoadGuitarsCompleteAction => ({
  type: ActionType.LoadGuitarsComplete,
  payload: guitars,
});

const loadGuitarsError = (): LoadGuitarsErrorAction => ({
  type: ActionType.LoadGuitarsError,
});

export {
  loadGuitarsComplete,
  loadGuitarsError,
  loadGuitarsStart
};
