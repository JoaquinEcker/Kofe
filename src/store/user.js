import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const setUser = createAction("SET_USER");

export const checkLogin = createAsyncThunk("USER", () => {
  return axios
    .get("/auth/me")
    .then((info) => info.data)
    .catch(() => console.log("Sin iniciar sesion"));
});

export const loginRequest = createAsyncThunk(
  "LOGIN",
  ({ email, password, errorAlert }) => {
    return axios
      .post("/auth/login", { email, password })
      .then((res) => res.data)
      .catch(() => errorAlert());
  }
);

export const logoutRequest = createAsyncThunk("LOGOUT", () => {
  return axios.get("/auth/logout").then((res) => res.data);
});

const userReducer = createReducer(
  {},
  {
    [setUser]: (state, action) => (state = action.payload),
    [loginRequest.fulfilled]: (state, action) => (state = action.payload),
    [logoutRequest.fulfilled]: (state, action) => action.payload,
    [loginRequest.pending]: (state, action) => ({ id: "pending" }),
    [checkLogin.fulfilled]: (state, action) => action.payload,
    [checkLogin.pending]: (state, action) => ({ id: "pending" }),
  }
);

export default userReducer;
