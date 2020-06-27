import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import feeds from "./feeds";
import articles from "./articles";
import article from "./article";

const reducer = combineReducers({
  user,
  feeds,
  articles,
  article,
});

const store = configureStore({
  reducer,
});

export default store;
