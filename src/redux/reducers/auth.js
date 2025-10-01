import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  loading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminExists: (state, action) => {
      state.admin = action.payload;
      state.loading = false;
    },
    adminNotExists: (state) => {
      state.admin = null;
      state.loading = false;
    },
  },
});

export default authSlice;

export const { adminExists, adminNotExists } = authSlice.actions;
