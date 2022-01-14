import { Guitar } from 'types/types';

const getSimilarName = (searchName: string) =>
  <T extends Guitar>(a: T, b: T) =>
    a.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) - b.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase());

export const sortSimilarGuitars = <T extends Guitar>(
  similarGuitars: T[],
  searchName: string,
): T[] =>
    [...similarGuitars].sort(getSimilarName(searchName.toLocaleLowerCase()));
