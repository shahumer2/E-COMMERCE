import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_Color_URL } from "../../constants/utils";


export const fetchcolor = createAsyncThunk(
  "fetchcolor",
  async (accessToken) => {
    const response = await fetch(GET_Color_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const colorSlice = createSlice({
  name: "color",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchcolor.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchcolor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchcolor.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default colorSlice.reducer;
