import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_API_DATA, HTTP, staticValues} from '../common/constant';
import {LOG} from '../common/utils';

const axios = require('axios').default;

export const apiCallAndStore = createAsyncThunk(
  GET_API_DATA,
  async (action, {dispatch, getState, rejectWithValue}) => {
    LOG('API_CALL_TYPE:', action.requestType);

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
          url: action.requestUrl.trim(),
          data: reqData,
          headers: header,
        };

        const apiRes = await axios(apiConfig, {timeout: 3});
        LOG('api response :', apiRes);

        switch (action.requestType) {
          case staticValues.apiTest:
            break;

          default:
            break;
        }

        return {
          requestType: action.requestType,
          requestData: action.jsonData,
          jsonData: apiRes.data,
          extraData: action.extraData,
        };
      } else {
        return action;
      }
    } catch (err) {
      LOG('API_DATA_ERROR :', err);
    }
  },
);

const initialState = {
  loading: false,
  posts: [],
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  extraReducers: builder => {
    builder.addCase(apiCallAndStore.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(apiCallAndStore.fulfilled, (state, action) => {
      LOG('apiCallAndStore.fulfilled :', action);

      switch (action.payload.requestType) {
        case staticValues.getAllPost:
          state.posts = action.payload.jsonData;
          break;
      }
    });

    builder.addCase(apiCallAndStore.rejected, (state, action) => {});
  },
});

const mainReducer = mainSlice.reducer;
export default mainReducer;
