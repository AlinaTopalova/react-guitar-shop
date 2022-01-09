export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments?: Comments[],
}

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

export type PaginationState = {
  end: number,
  start: number,
}

export type FilterState = Partial<Record<keyof Guitar, string[]>>;

export type SortState = {
  type?: string,
  order?: string,
};

