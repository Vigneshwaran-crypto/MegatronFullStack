export const GET_API_DATA = 'GET_API_DATA';

export const AuthToken = 'Bearer ';

export const staticValues = {
  apiTest: 'apiTest',
  getAllPost: 'getAllPost',
};

export const HTTP = {
  GET_ALL_PRODUCTS: 'https://fakestoreapi.com/products',

  //headers for api call without authorization
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },

  AuthHeader: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: AuthToken,
  },

  formDataHeader: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    Authorization: AuthToken,
  },
};
