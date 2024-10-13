// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice'; // Correct path to dataSlice

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
