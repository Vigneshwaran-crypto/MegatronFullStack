import appConfig from '../../app.json';

export const GET_API_DATA = 'GET_API_DATA';
export const JUST_STORE = 'JUST_STORE';

// 172.16.16.28 : always use ip address as domain or api getting network error :'http://172.16.16.17:5000/api/'

const isTesting = !false;

export const serverUrl = isTesting
  ? appConfig.testing.serverUrl
  : appConfig.production.serverUrl;

export const filePath = isTesting
  ? serverUrl + appConfig.testing.filesPath
  : serverUrl + appConfig.production.filesPath;

export const AuthToken = '';

export const staticValues = {
  apiTest: 'apiTest',
  logIn: 'logIn',
  createUser: 'createUser',
  getAllUsers: 'getAllUsers',
  editUserNameOrBio: 'editUserNameOrBio',
  userImagesUpload: 'userImagesUpload',
  createPost: 'createPost',
  getAllPosts: 'getAllPosts',
  likePost: 'likePost',
  getUserPosts: 'getUserPosts',
  commentPost: 'commentPost',
  getPostComments: 'getPostComments',
  getYourChats: 'getYourChats',
  clearChats: 'clearChats',
  saveUsersFcmToken: 'saveUsersFcmToken',
  deletePost: 'deletePost',
  deleteComment: 'deleteComment',
};

export const HTTP = {
  LOG_IN_URL: 'login',
  CREATE_USER: 'createUser',
  GET_ALL_USERS: 'getAllUsers',
  EDIT_USERNAME_OR_BIO: 'editUserNameOrBio',
  USER_IMAGES_UPLOAD: 'userImagesUpload',
  CREATE_POST: 'createPost',
  GET_ALL_POSTS: 'getAllPosts',
  LIKE_POST: 'likePost',
  GET_USER_POSTS: 'userPosts',
  COMMENT_POST: 'commentPost',
  GET_POST_COMMENTS: 'getPostComments',
  DELETE_COMMENT: 'deleteComment',
  GET_YOUR_CHATS: 'getYourChats',
  SAVE_FCM_TOKEN: 'saveUsersFcmToken',
  DELETE_POST: 'deletePost',

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
    Accept: 'application/json',
    Authorization: AuthToken,
  },

  // formDataHeader: {
  //   'Content-Type': 'multipart/form-data',
  //   Accept: '*/*',
  //   Authorization: AuthToken,
  // },
};
