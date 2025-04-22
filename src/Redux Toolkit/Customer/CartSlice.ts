import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../Config/Api";
import { RootState } from "../Store";
import { applyCoupon } from "./CouponSlice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const API_URL = "/api/cart";

// Fetch user cart
export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

interface AddItemRequest {
  productId: number 
  size: string;
  quantity: number;
}

// Add item to cart
export const addItemToCart = createAsyncThunk<
  void,
  { jwt: string | null; request: AddItemRequest }
>("cart/addItemToCart", async ({ jwt, request }, { dispatch, rejectWithValue }) => {
  try {
    await api.put(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  } catch (error: any) {
    return rejectWithValue("Failed to add item to cart");
  }
});

// Delete cart item
export const deleteCartItem = createAsyncThunk<
  void,
  { jwt: string; cartItemId: number }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`${API_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch(fetchUserCart(jwt));
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete cart item");
  }
});

// Update cart item
export const updateCartItem = createAsyncThunk<
  void,
  { jwt: string | null; cartItemId: number; cartItem: any }
>("cart/updateCartItem", async ({ jwt, cartItemId, cartItem }, { dispatch, rejectWithValue }) => {
  try {
    await api.put(`${API_URL}/item/${cartItemId}`, cartItem, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update cart item");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Item
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.couponCode = action.payload.couponCode;
          state.cart.couponprice = action.payload.couponprice;
          state.cart.totalSellingPrice = action.payload.totalSellingPrice;
        }
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
