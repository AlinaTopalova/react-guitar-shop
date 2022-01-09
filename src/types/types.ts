export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele'
}

export enum CordNumber {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}

export enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Complete = 'COMPLETE',
  Error = 'ERROR'
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
};

export enum FilterType {
  Equals = 'EQUALS',
  RangeFrom = 'RANGE_FROM',
  RangeTo = 'RANGE_TO'
}

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

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

