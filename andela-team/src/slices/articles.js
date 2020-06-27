import { createSlice } from "@reduxjs/toolkit";
import url from "../components/config";
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const initialState = {
  user: initialUser,
  loading: false,
  hasErrors: false,
  articles: [],
};

// A slice of user with our reducers
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticles: (state) => {
      state.loading = true;
    },
    getArticlesSuccess: (state, action) => {
      state.articles = action.payload.message;
      state.loading = false;
    },
    getArticlesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    postArticleSuccess: (state, action) => {
      // state.articles = action.payload;
    },
    postArticleFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Three actions generated from the slice
export const {
  getArticles,
  getArticlesSuccess,
  getArticlesFailure,
  postArticleFailure,
  postArticleSuccess,
} = articlesSlice.actions;

// A selector
export const articlesSelector = (state) => state.articles;

// The reducer
export default articlesSlice.reducer;

// Asynchronous thunk action
// export const fetchFeeds = () => async (dispatch) => {
//   const token = initialState.user.user.token;
//   axios
//     .get("http://localhost:5000/api/v1/feed", {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//     .then((response) => {
//       // const feed = response.data;
//       const feed = response.data.data;
//       console.log(feed);
//       dispatch(getFeedSuccess({ feed }));
//     })
//     .catch((error) => {
//       const err = error.response.data.error;
//       dispatch(getFeedsFailure({ err }));
//     });
// };
export function postArticle({ form_title, form_desc, form_cat, form_share }) {
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  const content = {
    title: form_title,
    description: form_desc,
    category: form_cat,
    share: form_share,
  };
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/api/v1/articles`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          authorization: "Bearer " + bearer_token,
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      dispatch(postArticleSuccess(data.data.message));
    } catch (error) {
      console.log(JSON.stringify(content));
      console.log(error);
      dispatch(postArticleFailure());
    }
  };
}

export function fetchArticles() {
  const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
  return async (dispatch) => {
    dispatch(getArticles());
    try {
      const response = await fetch(`${url}/api/v1/articles`, {
        headers: {
          authorization: "Bearer " + bearer_token,
        },
      });

      const data = await response.json();
      dispatch(getArticlesSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getArticlesFailure());
    }
  };
}
