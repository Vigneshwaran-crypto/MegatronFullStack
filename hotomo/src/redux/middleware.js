import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GET_API_DATA} from '../common/constant';
import {LOG} from '../common/utils';

export const apiCallAndStore = createAsyncThunk(
  GET_API_DATA,
  async (action, {dispatch, getState, rejectWithValue}) => {
    LOG('action_in_createAsyncThunk :', action);

    try {
    } catch (err) {
      LOG('API_DATA_ERROR :', err);
    }
  },
);

const initialState = {
  loading: false,
};

const mainSlice = createSlice({
  name: 'mainReducer',
  initialState,
  extraReducers: builder => {
    builder.addCase(apiCallAndStore.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(apiCallAndStore.fulfilled, (state, action) => {});

    builder.addCase(apiCallAndStore.rejected, (state, action) => {});
  },
});

const mainReducer = mainSlice.reducer;

export default mainReducer;
