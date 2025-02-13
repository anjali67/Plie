import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EVENTLISTINGAPI } from '../api';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState(); 
      const token = auth.token; 

      const response = await axios.post(
        EVENTLISTINGAPI,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("RESPONSE DATA IS ===========>",response)
      return response.data; 
    } catch (error) {
      console.log("error is",error)
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    favorites: [],
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
        state.events = action.payload; 
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch events';
      });
  },
});

export const { toggleFavorite } = eventSlice.actions;
export default eventSlice.reducer;