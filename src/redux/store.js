import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import authReducer from './authSlice'
import eventReducer from './eventSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer, 
    auth:authReducer,
    event:eventReducer
  },
});