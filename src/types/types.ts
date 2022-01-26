import { FilterType, GuitarType } from 'constants/constants';

export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

export type NewComment = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

export type Guitar = {
  description: string;
  id: number;
  name: string;
  previewImg: string;
  price: number;
  rating: number;
  stringCount: number;
  type: GuitarType;
  vendorCode: string;
  comments?: Comment[],
};

export type FilterState = Record<
  keyof Guitar | string,
  {
    type: FilterType;
    value: string | string[];
  }
>;

export type FilterSetAction = {
  field: keyof Guitar;
  type: FilterType;
  value: string | string[];
};

export type SortState = {
  type?: string,
  order?: string,
} | undefined;

export type PaginationState = {
  end: number;
  start: number;
};

