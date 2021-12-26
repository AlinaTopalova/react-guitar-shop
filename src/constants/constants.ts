const enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Card = '/sfssssss'
}

const enum ApiRoute {
  Guitars = 'guitars',
  GuitarWithComments = 'guitars?_embed=comments',
  SimilarGuitars = 'guitars?name_like=',
  Comments = 'comments',
  Coupons = 'coupons',
  Orders = 'orders',
}

export const Query = {
  Embed: '_embed',
  Limit: '_limit',
  Start: '_start',
  Sort: '_sort',
  Order: '_order',
  Like: '_like',
  GraterThanOrEqual: '_gte',
  LessThanOrEqual: '_lte',
} as const;

export {
  AppRoute,
  ApiRoute
};


