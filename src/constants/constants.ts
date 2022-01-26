export const STARS_MAX_AMOUNT = 5;

export const enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Guitar = '/guitars',
}

export const enum ApiRoute {
  Guitars = 'guitars',
  GuitarWithComments = 'guitars?_embed=comments',
  SimilarGuitars = 'guitars?name_like=',
  Comments = 'comments',
  Coupons = 'coupons',
  Orders = 'orders',
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele'
}

export const GuitarTypeName  = {
  [GuitarType.Acoustic]: 'Акустическая',
  [GuitarType.Electric]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Укулеле',
};

export const GuitarTypeLabel = {
  [GuitarType.Acoustic]: 'Акустические гитары',
  [GuitarType.Electric]: 'Электрогитары',
  [GuitarType.Ukulele]: 'Укулеле',
};

export enum CordNumber {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}

export const CordNumberLabel = {
  [CordNumber.Four]: '4',
  [CordNumber.Six]: '6',
  [CordNumber.Seven]: '7',
  [CordNumber.Twelve]: '12',
};

export enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Complete = 'COMPLETE',
  Error = 'ERROR'
}

export enum FilterType {
  Equals = 'EQUALS',
  RangeFrom = 'RANGE_FROM',
  RangeTo = 'RANGE_TO'
}

export enum OperatorQuery {
  Gte = '_gte',
  Like = '_like',
  Lte = '_lte'
}

export const PAGE_SIZE = 9;
export const PAGINATION_START = 0;

export enum PaginationQuery {
  End = '_end',
  Limit = '_limit',
  Start = '_start'
}

export enum SortQuery {
  Sort = '_sort',
  Order = '_order'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SortType {
  Price ='price',
  Rating ='rating',
}

export enum TabName {
  Characteristics = 'Характеристики',
  Description = 'Описание',
}

export enum ModalType {
  ModalNewReview = 'ModalNewReview',
  ModalSuccess = 'ModalSuccess',
}

export const Ratings = [
  {
    title: 'Отлично',
    value: '5',
  },
  {
    title: 'Хорошо',
    value: '4',
  },
  {
    title: 'Нормально',
    value: '3',
  },
  {
    title: 'Плохо',
    value: '2',
  },
  {
    title: 'Ужасно',
    value: '1',
  },
];
