// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for Login API Call
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://3.7.81.243/projects/plie-api/public/api/login',
        userCredentials
      );
      return response.data; // Return the API response data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle API errors
    }
  }
);

// Slice for Authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    token:null
  },
  reducers: {
    // Add other reducers if needed (e.g., logout)
    logout: (state) => {
      state.user = null;
      state.error = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data from API response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message from API
      });
  },
});

// Export Actions
export const { logout } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;