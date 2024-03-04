import {GET_API_DATA, HTTP, staticValues} from '../common/constant';

export const testAction = () => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.apiTest,
    requestUrl: HTTP.GET_ALL_PRODUCTS,
  };
};

export const logIn = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.logIn,
    requestUrl: HTTP.LOG_IN_URL,
    jsonData,
    noAuth: true,
  };
};

export const createUser = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.createUser,
    requestUrl: HTTP.CREATE_USER,
    jsonData,
    noAuth: true,
  };
};

export const getAllUsers = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.getAllUsers,
    requestUrl: HTTP.GET_ALL_USERS,
    jsonData,
    noAuth: true,
  };
};

export const editUserNameOrBio = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.editUserNameOrBio,
    requestUrl: HTTP.EDIT_USERNAME_OR_BIO,
    jsonData,
  };
};

export const userImagesUpload = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.userImagesUpload,
    requestUrl: HTTP.USER_IMAGES_UPLOAD,
    multiPart: true,
    jsonData,
  };
};

export const createPost = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.createPost,
    requestUrl: HTTP.CREATE_POST,
    multiPart: true,
    jsonData,
  };
};
