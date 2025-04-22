// src/Redux Toolkit/Customer/UserSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { api } from "../../Config/Api";
import { RootState } from "../Store";
import { Address, User, UserState } from "../../types/userTypes";

// API URLs
const API_URL = "/api/users";

// ---- Async Thunks ----
// save Address
export const addAddressToServer = createAsyncThunk<
  Address,
  { address: Address; jwt: string },
  { rejectValue: string }
>("user/addAddressToServer", async ({ address, jwt }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/api/addresses`, address, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue("Failed to add address");
  }
});




// Fetch User Profile
export const fetchUserProfile = createAsyncThunk<
  User,
  { jwt: string; navigate: any }
>("user/fetchUserProfile", async ({ jwt, navigate }, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.data.role === "ROLE_ADMIN") {
      navigate("/admin");
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to fetch user profile");
  }
});




// Fetch User Addresses
export const fetchUserAddresses = createAsyncThunk<Address[], string>(
  "user/fetchUserAddresses",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/addresses", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch addresses");
    }
  }
);

// Delete Address
export const deleteAddress = createAsyncThunk<
  number,
  { id: number; jwt: string },
  { rejectValue: string }
>("user/deleteAddress", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    await api.delete(`/api/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return id; // Return the deleted address ID
  } catch (error) {
    return rejectWithValue("Failed to delete address");
  }
});

// Update Address
export const updateAddress = createAsyncThunk<
  Address,
  { address: Address; jwt: string },
  { rejectValue: string }
>("user/updateAddress", async ({ address, jwt }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/api/addresses/${address.id}`, address, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue("Failed to update address");
  }
});

// ---- Slice ----
const initialState: UserState = {
  user: null,
  addresses: [],
  loading: false,
  error: null,
  profileUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.profileUpdated = false;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      if (Array.isArray(state.addresses)) {
        state.addresses.push(action.payload);
      } else {
        state.addresses = [action.payload];
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(addAddressToServer.fulfilled, (state, action: PayloadAction<Address>) => {
      if (Array.isArray(state.addresses)) {
        state.addresses.push(action.payload);
      } else {
        state.addresses = [action.payload];
      }
    })
    
      // Fetch User
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.addresses = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action: PayloadAction<number>) => {
        state.addresses = state.addresses.filter(address => address.id !== action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.addresses = state.addresses.map(address =>
          address.id === action.payload.id ? action.payload : address
        );
      });
  },
});

export const { resetUserState, addAddress } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserAddresses = (state: RootState) => state.user.addresses;
