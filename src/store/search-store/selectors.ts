import { NameSpace } from 'store/root-reducer';
import { Guitar } from 'types/data';
import { Store } from 'types/store';

const getSearchValue = (store: Store): string => store[NameSpace.search].searchValue;

const getSimilarGuitars = (store: Store): Guitar[] => store[NameSpace.search].similarGuitars;

export {
  getSearchValue,
  getSimilarGuitars
};
