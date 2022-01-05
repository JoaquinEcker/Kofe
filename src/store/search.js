import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const searchRequest = createAsyncThunk("SEARCH", (data) => {
  return axios.get(`/product/search/${data}`).then((res) => res.data);
});

const searchReducer = createReducer([], {
  [searchRequest.fulfilled]: (state, action) => action.payload,
});

export default searchReducer;
