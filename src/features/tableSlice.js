import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'tableData',
  initialState: {
    data: [], // Add your dummy data here or import from another file
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = tableSlice.actions;
export default tableSlice.reducer;
