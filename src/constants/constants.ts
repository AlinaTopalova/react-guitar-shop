import { CordNumber, GuitarType } from 'types/types';

export const enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Card = '/sfssssss'
}

export const enum ApiRoute {
  Guitars = 'guitars',
  GuitarWithComments = 'guitars?_embed=comments',
  SimilarGuitars = 'guitars?name_like=',
  Comments = 'comments',
  Coupons = 'coupons',
  Orders = 'orders',
}

export enum OperatorQuery {
  Gte = '_gte',
  Like = '_like',
  Lte = '_lte'
}

export enum PaginationQuery {
  End = '_end',
  Limit = '_limit',
  Start = '_start'
}

export enum SortQuery {
  Sort = '_sort',
  Order = '_order'
}

export enum SortByType {
  Price ='price',
  Rating ='rating',
}

export enum SortByOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const PAGE_SIZE = 9;
export const PAGINATION_START = 0;

export const GuitarTypeLabel = {
  [GuitarType.Acoustic]: 'Акустичесике гитары',
  [GuitarType.Electric]: 'Электрогитары',
  [GuitarType.Ukulele]: 'Укулеле',
};

export const CordNumberLabel = {
  [CordNumber.Four]: '4',
  [CordNumber.Six]: '6',
  [CordNumber.Seven]: '7',
  [CordNumber.Twelve]: '12',
};


