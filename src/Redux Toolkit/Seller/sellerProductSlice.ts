import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { api } from '../../Config/Api';
import { Product } from '../../types/productTypes';



const API_URL = '/sellers/product';

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    'sellerProduct/fetchSellerProducts',
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get<Product[]>(API_URL,{
                headers: { Authorization: `Bearer ${jwt}` },
                
            });
            console.log("seller products ",response.data)
            return response.data;
        } catch (error:any) {
            console.log("error ", error.response)
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk<Product, { request: any; jwt: string | null }>(
    'sellerProduct/createProduct',
    async ({ request, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post<Product>(API_URL, request, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            console.log("product created ",response.data)
            return response.data;
        } catch (error:any) {
            console.log("error ",error.response)
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk<Product, { productId: number; product: Product }>(
    'sellerProduct/updateProduct',
    async ({ productId, product }, { rejectWithValue }) => {
        try {
            console.log('Updating product with ID:', productId);

            // Make the PUT request to update the product
        //  const response = await axios.put<Product>(`${API_URL}/products/${productId}`, product);
            // const response = await axios.put<Product>(`${API_URL}/${productId}`, product);
            const response = await api.put<Product>(`${API_URL}/${productId}`, product);
            
            console.log('Product updated successfully:', response.data);
            return response.data;
        } catch (error: any) {
            // Reject the request with the error message in case of failure
            console.error('Error updating product:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk<void, number>(
    'sellerProduct/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/${productId}`);
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

interface SellerProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    productCreated:boolean;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
    productCreated:false,
};

const sellerProductSlice = createSlice({
    name: 'sellerProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productCreated=false;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.productCreated=false;
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.push(action.payload);
                state.loading = false;
                state.productCreated=true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create product';
                state.productCreated=false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.meta.arg);
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete product';
            });
    },
});

export default sellerProductSlice.reducer;

