import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

export const reducer = combineReducers({
  user: userSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
