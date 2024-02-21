import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_API_DATA, HTTP, serverUrl, staticValues} from '../common/constant';
import {LOG} from '../common/utils';

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

        // switch (action.requestType) {
        //   case staticValues.apiTest:
        //     break;

        //   default:
        //     break;
        // }

        return {
          requestType: action.requestType,
          requestData: action.jsonData,
          jsonData: apiRes.data.data,
          extraData: action.extraData,
          state: getState(),
        };
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
      switch (payload.requestType) {
        case staticValues.logIn:
          LOG('getAllPost_in_middleware :', payload);
          state.userDetails = payload.jsonData;
          break;
      }
    });

    builder.addCase(apiCallAndStore.rejected, (state, action) => {});
  },
});

const mainReducer = mainSlice.reducer;
export default mainReducer;
