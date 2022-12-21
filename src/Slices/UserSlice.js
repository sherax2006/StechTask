import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  per_page: 20,
  page_no: 1,
  order_by: "id",
  order_type: "desc",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    ChangeOrder: (state, action) => {
      state.order_by = action.payload;
    },
  },
});

export const { ChangeOrder } = UserSlice.actions;
export default UserSlice.reducer;
