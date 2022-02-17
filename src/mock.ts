import {
  FetchStatus,
  GuitarType,
  PAGE_SIZE,
  PAGINATION_START
} from 'constants/constants';
import { Guitar, Comment, Cart } from 'types/types';

export const guitarMock: Guitar = {
  id: 25,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: GuitarType.Electric,
  description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
};

export const guitarToBuyMock = {
  amount: 5,
  details: {
    id: 25,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
};

export const cartGuitarsMock: Cart = {
  '25': {
    amount: 2,
    details: {
      id: 25,
      name: 'Честер Bass',
      vendorCode: 'SO757575',
      type: GuitarType.Electric,
      description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
      previewImg: 'img/guitar-1.jpg',
      stringCount: 7,
      rating: 4,
      price: 17500,
    },
  },
};

export const guitarsList: Guitar[]  = [
  {
    id: 25,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 20,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 18,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 15,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 10,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 8,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 5,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 3,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 2,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
];

const defaultPagination = {
  start: PAGINATION_START,
  end: PAGINATION_START + PAGE_SIZE,
};

export const store = {
  catalog: {
    data: guitarsList,
    fetchStatus: FetchStatus.Idle,
    filterState: undefined,
    paginationState: defaultPagination,
    sortingState: undefined,
    isEmpty: false,
    totalAmount: undefined,
  },
  search: {
    searchValue: '',
    similarGuitars: guitarsList,
  },
  price: {
    priceFetchStatus: FetchStatus,
    minPrice: 1700,
    maxPrice: 35000,
  },
  guitar: {
    commentsFetchStatus: FetchStatus.Complete,
    newCommentFetchStatus: FetchStatus.Complete,
    comments: [],
  },
  cart: {
    goods: {},
    couponValue: '',
    discount: 0,
    couponStatus: FetchStatus.Idle,
  },
};

export const CommentsMock: Comment[] = [
  {
    id: '5',
    userName: 'Саша',
    advantage: 'Хорошо. Очень хорошо.',
    disadvantage: 'Плохо. Очень плохо.',
    comment: 'Неплохо, но дорого.',
    rating: 3,
    createAt: '2021-10-28T12:32:16.934Z',
    guitarId: 5,
  },
  {
    id: '5',
    userName: 'Саша',
    advantage: 'Хорошо. Очень хорошо.',
    disadvantage: 'Плохо. Очень плохо.',
    comment: 'Неплохо, но дорого.',
    rating: 3,
    createAt: '2021-10-28T12:32:16.934Z',
    guitarId: 5,
  },
  {
    id: '5',
    userName: 'Саша',
    advantage: 'Хорошо. Очень хорошо.',
    disadvantage: 'Плохо. Очень плохо.',
    comment: 'Неплохо, но дорого.',
    rating: 3,
    createAt: '2021-10-28T12:32:16.934Z',
    guitarId: 5,
  },
];
