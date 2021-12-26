import { SearchStore } from 'types/store';
import { Actions, ActionType } from 'types/actions';


const initialState: SearchStore = {
  searchValue: '',
  similarGuitars: [],
};

const searchReducer = (state = initialState, action: Actions):
SearchStore => {
  switch (action.type) {
    case ActionType.SetSearchValue:
      return {
        ...state,
        searchValue: action.payload,
      };
    case ActionType.LoadSimilarGuitars:
      return {
        ...state,
        similarGuitars: action.payload,
      };
    case ActionType.ClearSimilarGuitars:
      return {
        ...state,
        similarGuitars: [],
      };
    default:
      return state;
  }
};

export { searchReducer };
