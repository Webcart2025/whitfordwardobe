import React, { useEffect, useState } from "react";
import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import CartItemCard from "./CartItemCard";
import PricingCard from "./PricingCard";
import { CartItem } from "../../../types/cartTypes";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { applyCoupon, removeCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, coupone } = useAppSelector((store) => store);
  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      dispatch(
        applyCoupon({
          apply: "true",
          code: couponCode.trim(),
          orderValue: cart.cart?.totalSellingPrice || 0,
          jwt: localStorage.getItem("jwt") || "",
        })
      );      
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(
      removeCoupon({
        apply: "false",
        code: cart.cart?.couponCode || "",
        orderValue: cart.cart?.totalSellingPrice || 0,
        jwt: localStorage.getItem("jwt") || "",
      })
    )
    .unwrap()
    .then(() => {
      toast.success("Coupon removed successfully.");
    })
    .catch((err) => {
      toast.error(err.message || "Failed to remove coupon.");
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (coupone.couponApplied || coupone.error) {
      setSnackbarOpen(true);
      setCouponCode("");
    }
  }, [coupone.couponApplied, coupone.error]);

  return (
    <>
      {cart.cart && cart.cart.cartItems.length > 0 ? (
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              {cart.cart.cartItems.map((item: CartItem) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="col-span-1 text-sm space-y-3">
              <div className="border rounded-md px-5 py-3 space-y-5">
                <div className="flex gap-3 text-sm items-center">
                  <LocalOfferIcon sx={{ color: "black", fontSize: "17px" }} />
                  <span>Apply Coupons</span>
                </div>
                {!cart.cart.couponCode ? (
                  <div className="flex justify-between items-center">
                    <TextField
                      value={couponCode}
                      onChange={handleChange}
                      placeholder="Coupon code"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "black" },
                          "&:hover fieldset": { borderColor: "black" },
                          "&.Mui-focused fieldset": { borderColor: "black" },
                        },
                        input: { color: "black" },
                        "& .MuiInputLabel-root": { color: "black" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                      }}
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      size="small"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "black", opacity: 0.8 },
                        "&:disabled": { color: "white" },
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
                      <span>{cart.cart.couponCode} Applied</span>
                      <IconButton onClick={handleRemoveCoupon} size="small">
                        <CloseIcon className="text-red-600" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>

              <section className="border rounded-md">
                <PricingCard />
                <div className="p-5">
                  <Button
                    onClick={() => navigate("/checkout/address")}
                    sx={{
                      py: "11px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                    variant="contained"
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              </section>

              <div
                className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                onClick={() => navigate("/products")}
              >
                <span>Add Item From Wishlist</span>
                <FavoriteIcon sx={{ color: "black", fontSize: "21px" }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">Hey, your cart is empty!</h1>
            <p className="text-gray-500 text-sm">
              There is nothing in your bag, let’s add some items.
            </p>
          </div>
          <Button
            variant="outlined"
            sx={{
              py: "11px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
              "&:hover": { backgroundColor: "black", color: "white" },
            }}
            onClick={() => navigate("/products/Over_Sized_T-Shirt")}
          >
            Add Item To Cart
          </Button>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupone.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupone.error || "Coupon Applied Successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
