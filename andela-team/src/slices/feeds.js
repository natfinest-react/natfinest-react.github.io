import { createSlice } from "@reduxjs/toolkit";
import url from "../components/config";
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const initialState = {
  user: initialUser,
  loading: false,
  feeds: [],
};

// A slice of user with our reducers
const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    getFeeds: (state) => {
      state.loading = true;
    },
    getFeedSuccess: (state, action) => {
      state.feeds = action.payload;
      state.loading = false;
    },
    getFeedsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Three actions generated from the slice
export const { getFeeds, getFeedSuccess, getFeedsFailure } = feedsSlice.actions;

// A selector
export const feedsSelector = (state) => state.feeds;

// The reducer
export default feedsSlice.reducer;

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

export function fetchFeeds() {
  return async (dispatch) => {
    dispatch(getFeeds());
    try {
      const bearer_token = JSON.parse(localStorage.getItem("user")).user.token;
      const response = await fetch(`${url}/api/v1/feed`, {
        headers: {
          authorization: "Bearer " + bearer_token,
        },
      });

      const data = await response.json();
      dispatch(getFeedSuccess(data.data));
    } catch (error) {
      console.log(error);
      dispatch(getFeedsFailure());
    }
  };
}
