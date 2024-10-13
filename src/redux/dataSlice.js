// src/redux/dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    entries: [],
  },
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
  },
});

export const { addEntry, setEntries } = dataSlice.actions;
export default dataSlice.reducer;
