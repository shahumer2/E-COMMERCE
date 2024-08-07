import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_Brand_URL } from "../../constants/utils";


export const fetchbrand = createAsyncThunk(
  "fetchbrand",
  async (accessToken) => {
    const response = await fetch(GET_Brand_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchbrand.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchbrand.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchbrand.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default brandSlice.reducer;
