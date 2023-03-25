import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    contract: "",
  },
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload;
    },
  },
});

export const { setContract } = globalSlice.actions;

export default globalSlice.reducer;
