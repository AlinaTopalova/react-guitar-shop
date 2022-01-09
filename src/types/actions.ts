import { Guitar } from './data';

export enum ActionType {
  LoadGuitarsStart = 'data/loadGuitarsStart',
  LoadGuitarsComplete = 'data/loadGuitarsComplete',
  LoadGuitarsError = 'data/loadGuitarsError',
  SetSearchValue = 'search/setSearchValue',
  LoadSimilarGuitars = 'data/similarGuitars',
  ClearSimilarGuitars = 'search/clearSimilarGuitars',
  SetSortByType = 'catalog/setSortByType',
  SetSortByOrder = 'catalog/SetSortByOrder',
}

export type LoadGuitarsStartAction = {
  type: ActionType.LoadGuitarsStart;
}

export type LoadGuitarsCompleteAction  = {
  type: ActionType.LoadGuitarsComplete;
  payload: Guitar[];
}

export type LoadGuitarsErrorAction = {
  type: ActionType.LoadGuitarsError;
}

export type SetSearchValueAction = {
  type: ActionType.SetSearchValue;
  payload: string;
}

export type LoadSimilarGuitarsAction = {
  type: ActionType.LoadSimilarGuitars;
  payload: Guitar[];
}

export type ClearSimilarGuitarsAction = {
  type: ActionType.ClearSimilarGuitars;
}

export type SetSortByTypeAction = {
  type: ActionType.SetSortByType;
  payload: string;
}

export type SetSortByOrderAction = {
  type: ActionType.SetSortByOrder;
  payload: string;
}

export type Actions =
  | LoadGuitarsCompleteAction
  | LoadGuitarsErrorAction
  | LoadGuitarsStartAction
  | SetSearchValueAction
  | LoadSimilarGuitarsAction
  | ClearSimilarGuitarsAction
  | SetSortByTypeAction
  | SetSortByOrderAction
