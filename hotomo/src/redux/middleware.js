import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_API_DATA, HTTP, serverUrl, staticValues} from '../common/constant';
import {LOG, Toast} from '../common/utils';
import * as RootNav from '../router/RootNav';

const axios = require('axios').default;

export const apiCallAndStore = createAsyncThunk(
  GET_API_DATA,
  async (action, {dispatch, getState, rejectWithValue}) => {
    LOG('Api Request Type:', action.requestType);

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
            }
            // goNext = true
            break;

          case staticValues.logIn:
            LOG('logIn_in_middleware :', apiResData);

            if (apiResData.status === 1) {
              goNext = true;
              RootNav.navigate('homeTab');
            } else {
              Toast('Enter valid credential');
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
      LOG('API_DATA_ERROR :', err.message);
    }
  },
);

const initialState = {
  loading: false,
  posts: [],
  userDetails: {},
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  extraReducers: builder => {
    builder.addCase(apiCallAndStore.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(apiCallAndStore.fulfilled, (state, {payload}) => {
      if (payload) {
        switch (payload.requestType) {
          case staticValues.createUser:
            LOG('createUser_in_Reducer :', payload);
            break;

          case staticValues.logIn:
            LOG('logIn_in_Reducer :', payload);
            state.userDetails = payload.jsonData;
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
