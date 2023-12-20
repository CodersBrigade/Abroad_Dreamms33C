import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { UserState } from "../../types/user";
import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState: UserState = {
  error: null,
  users: [
    {
      id: "1",
      name: "Admin",
      email: "admin@gmail.com",
      password: "password",
    },
  ],
  selectedUser: undefined,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    validateUser(state, action) {
      const loginData = action.payload;
      const index = state.users.findIndex(
        (user) =>
          user.email === loginData.email && user.password === loginData.password
      );
      const userIsValid = index >= 0;
      if (!userIsValid) {
        throw new Error("Invalid Credentials");
      }
      state.selectedUser = state.users[index];
    },

    selectUserSuccess(state, action) {
      const index = state.users.findIndex((item) => item.id === action.payload);
      state.selectedUser = state.users[index];
    },

    deleteUserSuccess(state, action) {
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      state.users = filteredUsers;
    },

    createUserSuccess(state, action) {
      const newUser = { ...action.payload, id: v4() };
      state.users = [...state.users, newUser];
    },

    updateUserSuccess(state, action) {
      const updateIndex = state.users.findIndex(
        (item) => item.id === action.payload.id
      );
      state.users = state.users.map((user, index) =>
        updateIndex === index ? { ...action.payload.user, id: user.id } : user
      );
    },

    clearUser(state) {
      state.selectedUser = undefined;
    },

    clearUsers(state) {
      state.users = [];
    },

    clearHasError(state) {
      state.error = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { validateUser, clearUser, clearHasError, clearUsers } =
  slice.actions;

// ----------------------------------------------------------------------

export function selectUser(id: string) {
  return async () => {
    try {
      dispatch(slice.actions.selectUserSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

export function createUser(user: CreateUserProps) {
  return async () => {
    try {
      dispatch(slice.actions.createUserSuccess(user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function updateUser(id: string, user: any) {
  return async () => {
    try {
      dispatch(slice.actions.updateUserSuccess({ id, user }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteUser(id: string) {
  return async () => {
    try {
      dispatch(slice.actions.deleteUserSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}
