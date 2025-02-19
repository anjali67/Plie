import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); // Access the auth state
      const token = auth.token; // Get the token

      const response = await axios.post(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {}, // Empty body for POST request (if required)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );
      
      return response.data; // Return the API response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch events');
    }
  }
);


const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [], // Initialize events as an empty array
    favorites: [], // Initialize favorites as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const eventId = action.payload;
      const index = state.favorites.indexOf(eventId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(eventId);
      }
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the API response has a `data` key containing `events`
        state.events = action.payload.data || []; // Handle undefined data
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch events';
      });
  },
});

export const { toggleFavorite } = eventSlice.actions;
export default eventSlice.reducer;