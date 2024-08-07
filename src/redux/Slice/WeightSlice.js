import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_Weight_URL } from "../../constants/utils";


export const fetchweight = createAsyncThunk(
  "fetchweight",
  async (accessToken) => {
    const response = await fetch(GET_Weight_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const weightSlice = createSlice({
  name: "weight",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchweight.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchweight.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchweight.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default weightSlice.reducer;
