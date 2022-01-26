import dayjs from 'dayjs';
import { Guitar } from 'types/types';

export const getFormatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM');

const getSimilarName = (searchName: string) =>
  <T extends Guitar>(a: T, b: T) =>
    a.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) - b.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase());

export const sortSimilarGuitars = <T extends Guitar>(
  similarGuitars: T[],
  searchName: string,
): T[] =>
    [...similarGuitars].sort(getSimilarName(searchName.toLocaleLowerCase()));

export const isEscEvent = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';
