import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../lib/userSlice";
import receiverSlice from "@/lib/receiverSlice";

export const makeStore = configureStore({
  reducer: {
    user: userSlice,
    receiver: receiverSlice,
  },
});
