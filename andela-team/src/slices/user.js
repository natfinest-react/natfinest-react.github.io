import { createSlice } from "@reduxjs/toolkit";
import url from "../components/config";
import axios from "axios";
import * as JWT from "jwt-decode";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).user.token
  : null;
if (token) {
  if (JWT(token).exp < Date.now() / 1000) {
    localStorage.removeItem("user");
  }
}

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const initialState = {
  user: initialUser,
  error: "",
  loading: "",
  hasErrors: "",
};

// A slice of user with our reducers
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.hasErrors = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.hasErrors = true;
    },
    registerSuccess: (state, action) => {
      state.hasErrors = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.hasErrors = true;
    },
    logoutSuccess: (state) => {
      state.hasErrors = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Three actions generated from the slice
export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutSuccess,
} = slice.actions;

// A selector
export const userSelector = (state) => state.user;

// The reducer
export default slice.reducer;

// Asynchronous thunk action
export const login = ({ username, password }) => async (dispatch) => {
  axios
    .post(`${url}/api/v1/auth/signin`, {
      email: username,
      password: password,
    })
    .then((response) => {
      const { firstname, email, id, token } = response.data.data;
      const user = { firstname, email, id, token };
      dispatch(loginSuccess({ user }));
    })
    .catch((error) => {
      error = error.response.data.error;
      dispatch(loginFailure({ error }));
    });
};

export const register = ({
  form_firstname,
  form_lastname,
  form_email,
  form_password,
  form_gender,
  form_jobrole,
  form_department,
  form_address,
  form_avatarurl,
  form_userrole,
}) => async (dispatch) => {
  axios
    .post(`${url}/api/v1/auth/create-user`, {
      firstname: form_firstname,
      lastname: form_lastname,
      email: form_email,
      password: form_password,
      gender: form_gender,
      jobrole: form_jobrole,
      department: form_department,
      address: form_address,
      avatarurl: form_avatarurl,
      userrole: form_userrole,
    })
    .then((response) => {
      const { firstname, email, id, token } = response.data.data;
      const user = { firstname, email, id, token };
      dispatch(registerSuccess({ user }));
    })
    .catch((err) => {
      const error = err.response.data.error;
      dispatch(registerFailure({ error }));
    });
};

export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
