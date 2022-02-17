import dayjs from 'dayjs';
import { Cart, Guitar } from 'types/types';

export const getFormatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM');

const getSimilarName = (searchName: string) =>
  <T extends Guitar>(a: T, b: T) =>
    a.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) - b.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase());

export const sortSimilarGuitars = <T extends Guitar>(
  similarGuitars: T[],
  searchName: string,
): T[] =>
    [...similarGuitars].sort(getSimilarName(searchName.toLocaleLowerCase()));

export const isEscEvent = (evt: KeyboardEvent) =>
  evt.key === 'Escape' || evt.key === 'Esc';

export const getSumOfGoods = (goods: Cart) => {
  const sum = Object.values(goods).reduce((acc, cur) =>
    acc + (cur.amount * cur.details.price), 0);
  return sum;
};

export const getDiscountPercent = (discount: number) => {
  const discountPercent = discount * 0.01;
  return discountPercent;
};

export const deleteSpaces = (str: string) => {
  str = str.replace(/\s/g, '');
  return str;
};

