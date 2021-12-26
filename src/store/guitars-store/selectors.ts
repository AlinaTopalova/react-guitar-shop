import { Guitar } from 'types/data';
import { NameSpace } from 'store/root-reducer';
import { Store } from 'types/store';

const getIsGuitarsLoading = (store: Store): boolean => store[NameSpace.guitars].isGuitarsLoading;

const getIsGuitarsLoaded = (store: Store): boolean => store[NameSpace.guitars].isGuitarsLoaded;

const getGuitars = (store: Store): Guitar[] => store[NameSpace.guitars].guitars;

export {
  getGuitars,
  getIsGuitarsLoading,
  getIsGuitarsLoaded
};
