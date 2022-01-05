import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export default store;
