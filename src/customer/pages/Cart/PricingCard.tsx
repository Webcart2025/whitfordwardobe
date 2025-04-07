import React from "react";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../../util/cartCalculator";
import { useAppSelector } from "../../../Redux Toolkit/Store";

interface PricingCardProps {
  showBuyButton?: boolean;
  SubmitButton?: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ showBuyButton, SubmitButton }) => {
  const navigate = useNavigate();
  const { cart } = useAppSelector((store) => store);

  const cartItems = cart.cart?.cartItems || [];
  
  // Ensure correct values are used
  const mrpTotal = cart.cart?.totalMrpPrice || sumCartItemMrpPrice(cartItems);
  const sellingTotal = cart.cart?.totalSellingPrice || sumCartItemSellingPrice(cartItems);
  const couponDiscount = cart.cart?.couponprice || 0;  // FIX: Correct field name
  const productDiscount = cart.cart?.discount || (mrpTotal - sellingTotal);
  const finalTotal = sellingTotal;  // FIX: No need to subtract couponPrice again

  return (
    <div className="space-y-3 p-5 border rounded-md shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹ {mrpTotal}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Product Discount</span>
        <span>  -{productDiscount}  %</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Shipping</span>
        <span>Free</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Platform Fee</span>
        <span>Free</span>
      </div>

      {/* Show coupon discount only if applied */}
      {couponDiscount > 0 && (
        <div className="flex justify-between items-center">
          <span>Coupon Discount ({cart.cart?.couponCode})</span>
          <span className="text-green-600">- ₹ {couponDiscount}</span>
        </div>
      )}

      <Divider />

      <div className="font-medium px-1 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>₹ {finalTotal > 0 ? finalTotal : 0}</span>
      </div>

      {showBuyButton && (
        <div className="pt-4">
          {SubmitButton || (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                navigate("/checkout/address");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              
            >
              Proceed to Buy
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingCard;
