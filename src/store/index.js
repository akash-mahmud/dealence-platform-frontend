import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slicers/global";
export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
