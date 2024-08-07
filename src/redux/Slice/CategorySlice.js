import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_Category_URL } from "../../Constants/utils";


export const fetchcategory = createAsyncThunk(
  "fetchcategory",
  async (accessToken) => {
    const response = await fetch(GET_Category_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchcategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchcategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchcategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default categorySlice.reducer;
