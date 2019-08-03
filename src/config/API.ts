export const BASE_URL = '';

const prefixAPI = url => `${BASE_URL}${url}`;

export default {
  products: () => prefixAPI('/products/list'),
  searchedProducts: () => prefixAPI('/products/search/result'),
  searchProducts: () => prefixAPI('/products/search'),

  userWishes: () => prefixAPI('/profile/mypage/wishes'),
  userGifts: () => prefixAPI('/profile/mypage/intentions'),
  friendWishes: id => prefixAPI(`/profile/${id}/wishes`),
  friendGifts: id => prefixAPI(`/profile/${id}/intentions`),

  addWish: () => prefixAPI('/profile/mypage/wishes'),

  auth: () => prefixAPI('/auth'),
};
