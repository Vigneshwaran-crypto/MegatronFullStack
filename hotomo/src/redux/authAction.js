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
