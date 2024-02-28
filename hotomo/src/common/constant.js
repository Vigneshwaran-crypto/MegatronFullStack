export const GET_API_DATA = 'GET_API_DATA';

// 172.16.16.28 : always use ip address as domain or api getting network error
export const serverUrl = 'http://172.16.16.31:5000/api/';

export const AuthToken = '';

export const staticValues = {
  apiTest: 'apiTest',
  getAllPost: 'getAllPost',
  logIn: 'logIn',
  createUser: 'createUser',
  getAllUsers: 'getAllUsers',
  editUserNameOrBio: 'editUserNameOrBio',
};

export const HTTP = {
  GET_ALL_PRODUCTS: 'https://fakestoreapi.com/products',
  LOG_IN_URL: 'login',
  CREATE_USER: 'createUser',
  GET_ALL_USERS: 'getAllUsers',
  EDIT_USERNAME_OR_BIO: 'editUserNameOrBio',

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
