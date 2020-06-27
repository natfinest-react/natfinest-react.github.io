import { createSlice } from "@reduxjs/toolkit";
import url from "../components/config";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const initialState = {
  user: initialUser,
  loading: false,
  hasErrors: false,
  article: {},
};

// A slice of user with our reducers
const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticle: (state) => {
      state.loading = true;
    },
    getArticleSuccess: (state, action) => {
      state.article = action.payload;
      state.loading = false;
    },
    getArticleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    postCommentSuccess: (state, action) => {
      state.article = action.payload;
      state.loading = false;
    },
    postCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    editArticleSuccess: (state, action) => {
      state.article = action.payload;
      state.loading = false;
    },
    editArticleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteArticleSuccess: (state, action) => {
      state.article = action.payload;
      state.loading = false;
    },
    deleteArticleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Three actions generated from the slice
export const {
  getArticle,
  getArticleSuccess,
  getArticleFailure,
  editArticleSuccess,
  editArticleFailure,
  deleteArticleSuccess,
  deleteArticleFailure,
  postCommentSuccess,
  postCommentFailure,
} = articleSlice.actions;

// A selector
export const articleSelector = (state) => state.article;

// The reducer
export default articleSlice.reducer;

export function postComment({ form_comment }, id) {
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  const content = {
    description: form_comment,
  };
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/api/v1/articles/${id}/Comment`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          authorization: "Bearer " + bearer_token,
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      console.log(data);
      dispatch(postCommentSuccess(data.data.message));
    } catch (error) {
      console.log(JSON.stringify(content));
      console.log(error);
      dispatch(postCommentFailure());
    }
  };
}

export function fetchArticle(id) {
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  return async (dispatch) => {
    dispatch(getArticle());
    try {
      const response = await fetch(`${url}/api/v1/articles/${id}`, {
        headers: {
          authorization: "Bearer " + bearer_token,
        },
      });

      const data = await response.json();
      dispatch(getArticleSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getArticleFailure());
    }
  };
}

export function deleteArticle(id) {
  // console.log(JSON.parse(localStorage.getItem("user")));
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  return async (dispatch) => {
    dispatch(getArticle());
    try {
      const response = await fetch(`${url}/api/v1/articles/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + bearer_token,
        },
      });

      const data = await response.json();
      dispatch(deleteArticleSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(deleteArticleFailure());
    }
  };
}

export function editArticle(id, { form_title, form_desc }) {
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  const content = {
    title: form_title,
    description: form_desc,
  };
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/api/v1/articles/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          authorization: "Bearer " + bearer_token,
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      dispatch(editArticleSuccess(data.data.message));
    } catch (error) {
      console.log(JSON.stringify(content));
      console.log(error);
      dispatch(editArticleFailure());
    }
  };
}
