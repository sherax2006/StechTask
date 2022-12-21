import LoginReducer from "../Reducers/Reducers";
import UserSlice from "../Slices/UserSlice";
import UserReduce from "../Reducers/UserReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    Login: LoginReducer,
    UserRed: UserSlice,
    UsReducer: UserReduce,
  },
});
