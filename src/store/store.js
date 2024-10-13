// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../redux/dataSlice'; // Update the path to the correct location of dataSlice

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
