import {GET_API_DATA, HTTP, JUST_STORE, staticValues} from '../common/constant';
import {LOG} from '../common/utils';

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

export const getAllPost = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.getAllPosts,
    requestUrl: HTTP.GET_ALL_POSTS,
    jsonData,
  };
};

export const likePostAct = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.likePost,
    requestUrl: HTTP.LIKE_POST,
    jsonData,
  };
};

export const getUserPosts = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.getUserPosts,
    requestUrl: HTTP.GET_USER_POSTS,
    jsonData,
  };
};

export const getPostComments = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.getPostComments,
    requestUrl: HTTP.GET_POST_COMMENTS,
    jsonData,
  };
};

export const commentPostAct = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.commentPost,
    requestUrl: HTTP.COMMENT_POST,
    jsonData,
  };
};

export const getYourChatAct = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.getYourChats,
    requestUrl: HTTP.GET_YOUR_CHATS,
    jsonData,
  };
};

export const clearChats = extraData => {
  LOG('clearChats action');
  return {
    type: JUST_STORE, //must give this for just storing purpose
    requestType: staticValues.clearChats,
  };
};

export const saveFcmToken = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.saveUsersFcmToken,
    requestUrl: HTTP.SAVE_FCM_TOKEN,
    jsonData,
  };
};

export const deletePostAct = jsonData => {
  return {
    type: GET_API_DATA,
    requestType: staticValues.deletePost,
    requestUrl: HTTP.DELETE_POST,
    jsonData,
  };
};
