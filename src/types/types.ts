import { FilterType, GuitarType } from 'constants/constants';

export type Comments = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: Date,
  guitarId: number,
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
  comments?: Comments[],
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

