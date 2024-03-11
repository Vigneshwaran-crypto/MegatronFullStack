import {StackActions} from '@react-navigation/native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_API_DATA, HTTP, serverUrl, staticValues} from '../common/constant';
import {LOG, Toast, storeItem} from '../common/utils';
import * as RootNav from '../router/RootNav';
import {getAllPost} from './authAction';

const axios = require('axios').default;

export const apiCallAndStore = createAsyncThunk(
  GET_API_DATA,
  async (action, {dispatch, getState, rejectWithValue}) => {
    LOG('Api Request Type:', action);

    try {
      if (action.type === GET_API_DATA) {
        let method = 'post';
        let header = HTTP.AuthHeader;
        let reqData = JSON.stringify(action.jsonData);

        if (action.get) method = 'get';

        if (action.noAuth) {
          header = HTTP.HEADERS;
        } else if (action.multiPart) {
          header = HTTP.formDataHeader;
          reqData = action.jsonData;
        }

        const apiConfig = {
          method: method,
          url: serverUrl + action.requestUrl.trim(),
          data: reqData,
          headers: header,
          timeout: 1000 * 10, //10 seconds for timeout
        };

        LOG('Axios config ====>', apiConfig);

        const apiRes = await axios(apiConfig);
        LOG('Axios Response ====>', apiRes);
        LOG('Status Code :' + apiRes.status);
        const apiResData = apiRes.data;

        let goNext = false;

        switch (action.requestType) {
          case staticValues.createUser:
            LOG('createUser_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
              Toast('Account created successfully');
              RootNav.navigationRef.goBack();
            } else {
              Toast(apiResData.message);
            }
            break;

          case staticValues.logIn:
            LOG('logIn_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
              const token = apiResData.token;

              HTTP.AuthHeader.Authorization = token;
              HTTP.formDataHeader.Authorization = token;

              storeItem('token', token);
              RootNav.navigate('homeTab');
              dispatch(apiCallAndStore(getAllPost({})));
            } else {
              RootNav.navigate('logIn');
              Toast(apiResData.message);
            }
            break;

          case staticValues.editUserNameOrBio:
            LOG('editUserNameOrBio_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          case staticValues.userImagesUpload:
            LOG('userImagesUpload_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          case staticValues.createPost:
            LOG('createPost_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
              Toast('Posted Successfully');
              RootNav.navigationRef.dispatch(StackActions.pop(2)); //navigating two screen back
            } else {
              Toast('Please try again');
            }
            break;

          case staticValues.getAllPosts:
            LOG('getAllPosts_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          case staticValues.likePost:
            LOG('likePost_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          case staticValues.getUserPosts:
            LOG('getUserPosts_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          case staticValues.commentPost:
            LOG('commentPost_in_middleware :', apiResData);
            if (apiResData.status === 1) {
              goNext = true;
            }
            break;

          default:
            goNext = true;
            break;
        }

        if (goNext) {
          return {
            requestType: action.requestType,
            requestData: action.jsonData,
            jsonData: apiRes.data.data,
            extraData: action.extraData,
            // state: getState(),
          };
        }
      } else {
        return action;
      }
    } catch (err) {
      LOG('API_DATA_ERROR :', err);
      LOG('API_DATA_ERROR_MESSAGE :', err.message);
    }
  },
);

const initialState = {
  loading: false,
  allPosts: [],
  userDetails: {},
  userPosts: [],
  postComments: [],
  allUsers: [],
  allChats: [],
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  extraReducers: builder => {
    builder.addCase(apiCallAndStore.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(apiCallAndStore.fulfilled, (state, {payload}) => {
      state.loading = false; // making loading false
      if (payload) {
        switch (payload.requestType) {
          case staticValues.logIn:
            LOG('logIn_in_Reducer :', payload);
            state.userDetails = payload.jsonData;
            break;

          case staticValues.editUserNameOrBio:
            LOG('editUserNameOrBio_in_Reducer :', payload);
            state.userDetails = {...state.userDetails, ...payload.jsonData};
            break;

          case staticValues.userImagesUpload:
            LOG('userImagesUpload_in_Reducer :', payload);
            state.userDetails = payload.jsonData;
            break;

          case staticValues.getAllPosts:
            LOG('getAllPosts_in_Reducer :', payload);
            state.allPosts = payload.jsonData;
            break;

          case staticValues.createPost:
            LOG('createPost_in_Reducer :', payload);
            const newPost = [payload.jsonData];
            const prevPost = state.allPosts;
            state.allPosts = newPost.concat(prevPost);
            break;

          case staticValues.likePost:
            LOG('likePost_in_Reducer :', payload);
            const likedData = payload.jsonData;
            const postList = state.allPosts;
            const changedList = postList.map(post => {
              if (post._id === likedData.postId) {
                post.youLiked = likedData.reactionType === '1' ? true : false;
              }
              return post;
            });
            state.allPosts = changedList;
            break;

          case staticValues.getUserPosts:
            LOG('getUserPosts_in_Reducer :', payload);
            state.userPosts = payload.jsonData;
            break;

          case staticValues.getPostComments:
            LOG('getPostComments_in_Reducer :', payload);
            state.postComments = payload.jsonData;
            break;

          case staticValues.commentPost:
            LOG('commentPost_in_Reducer :', payload);
            state.postComments.push(payload.jsonData);
            break;

          case staticValues.getAllUsers:
            LOG('getAllUsers_in_reducer :', payload);
            state.allUsers = payload.jsonData;
            break;

          case staticValues.getYourChats:
            LOG('getYourChats_in_reducer :', payload);
            state.allChats = payload.jsonData;
            break;

          case staticValues.clearChats:
            state.allChats = [];
            break;

          default:
            break;
        }
      }
    });

    builder.addCase(apiCallAndStore.rejected, (state, action) => {
      LOG('apiCallAndStore_rejected');
      state.loading = false;
    });
  },
});

const mainReducer = mainSlice.reducer;
export default mainReducer;
