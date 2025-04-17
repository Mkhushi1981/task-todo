// src/features/filters/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    priority: "All",
  },
  reducers: {
    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export const { setPriorityFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
