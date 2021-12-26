import { combineReducers } from 'redux';
import { guitarsReducer } from './guitars-store/guitars-store';
import { searchReducer } from './search-store/search-store';

export enum NameSpace {
  guitars = 'GUITARS',
  search = 'SEARCH',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsReducer,
  [NameSpace.search]: searchReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;
