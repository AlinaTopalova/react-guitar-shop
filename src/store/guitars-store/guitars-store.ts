import { GuitarsStore } from 'types/store';
import { Actions, ActionType } from 'types/actions';

const initialState: GuitarsStore = {
  guitars: [],
  isGuitarsLoading: false,
  isGuitarsLoaded: false,
};

const guitarsReducer = (state = initialState, action: Actions): GuitarsStore => {
  switch (action.type) {
    case ActionType.LoadGuitarsStart:
      return {
        ...state, isGuitarsLoading: true,
      };
    case ActionType.LoadGuitarsComplete:
      return {
        ...state,
        guitars: action.payload,
        isGuitarsLoading: false,
        isGuitarsLoaded: true,
      };
    case ActionType.LoadGuitarsError:
      return {
        ...state,
        isGuitarsLoading: false,
        isGuitarsLoaded: false,
      };
    default:
      return state;
  }
};

export { guitarsReducer };
