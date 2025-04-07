import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../types/cartTypes";
import { CouponState } from "../../types/couponTypes";
import { api } from "../../Config/Api";

const API_URL = "/api/coupons";

// Async thunk to apply coupon
export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  { rejectValue: string }
>(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        params: { apply, code, orderValue },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Apply coupon: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Apply coupon error: ", error);
      return rejectWithValue(error.response?.data?.error || "Failed to apply coupon");
    }
  }
);

// Async thunk to remove coupon
export const removeCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  { rejectValue: string }
>(
  "coupon/removeCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        params: { apply, code, orderValue },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Remove coupon: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Remove coupon error: ", error);
      return rejectWithValue(error.response?.data?.error || "Failed to remove coupon");
    }
  }
);

// Initial state
const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
};

// Slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCouponState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
      state.couponApplied = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        if (action.meta.arg.apply === "true") {
          state.couponApplied = true;
        }
      })
      .addCase(
        applyCoupon.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to apply coupon";
          state.couponApplied = false;
        }
      )
      .addCase(removeCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.couponApplied = false;
      })
      .addCase(
        removeCoupon.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to remove coupon";
        }
      );
  },
});

export const { resetCouponState } = couponSlice.actions;
export default couponSlice.reducer;