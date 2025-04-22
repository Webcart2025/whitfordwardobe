import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Address } from '../../../types/userTypes';
import { api } from '../../../Config/Api';

export const fetchAddress = createAsyncThunk(
    'user/fetchAddress',
    async (_, thunkAPI) => {
      try {
        const token = localStorage.getItem('token'); // Get token from storage
        const response = await axios.get('http://localhost:8080/api/addresses', {
          headers: {
            Authorization: `Bearer ${token}` // Include JWT token
          }
        });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch addresses');
      }
    }
  );

interface UserState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default addressSlice.reducer;
