import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../Config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// ✅ Fetch Wishlist
export const getWishlistByUserId = createAsyncThunk<
  Wishlist,
  void,
  { rejectValue: string }
>(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

// ✅ Add Product to Wishlist
export const addProductToWishlist = createAsyncThunk<
  Wishlist,
  { productId: number },
  { rejectValue: string }
>(
  "wishlist/addProductToWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product to wishlist");
    }
  }
);

// ✅ Remove Product from Wishlist
export const removeProductFromWishlist = createAsyncThunk<
  { productId: number }, // ✅ Return productId as an object
  { productId: number },
  { rejectValue: string }
>(
  "wishlist/removeProductFromWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/wishlist/remove-product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return { productId }; // ✅ Return productId as an object for better reducer handling
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove product from wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 📌 Fetch Wishlist
    builder.addCase(getWishlistByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWishlistByUserId.fulfilled, (state, action: PayloadAction<Wishlist>) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishlistByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An unknown error occurred";
    });

    // 📌 Add Product to Wishlist
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductToWishlist.fulfilled, (state, action: PayloadAction<Wishlist>) => {
      state.wishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An unknown error occurred";
    });

    // 📌 Remove Product from Wishlist
    builder.addCase(removeProductFromWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeProductFromWishlist.fulfilled, (state, action: PayloadAction<{ productId: number }>) => {
      if (state.wishlist?.products) {
        state.wishlist.products = state.wishlist.products.filter(
          (product) => product.id !== action.payload.productId // ✅ Correct property access
        );
      }
      state.loading = false;
    });
    builder.addCase(removeProductFromWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An unknown error occurred";
    });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
