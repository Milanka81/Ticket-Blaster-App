import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "../services/ecommerceService";

export const getShoppingCart = createAsyncThunk("getShoppingCart", async () => {
  const response = await getCart();
  return response.data.myCart;
});

interface CartItem {
  id: string;
  event: {
    _id: string;
    imageCover: string;
    eventName: string;
    eventDate: string;
    description: string;
    location: string;
    ticketPrice: number;
  };
  quantity: number;
}
interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};
const ecommerceSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShoppingCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getShoppingCart.rejected, (state, action) => {
        state.loading = false;
        state.cart = [];
        state.error = action.error.message ?? null;
      });
  },
});
export default ecommerceSlice.reducer;
