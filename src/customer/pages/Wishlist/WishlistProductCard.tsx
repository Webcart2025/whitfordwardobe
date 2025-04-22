import React, { MouseEvent } from "react";
import { teal } from "@mui/material/colors";
import { Product } from "../../../types/productTypes";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";

import { removeProductFromWishlist } from "../../../Redux Toolkit/Customer/WishlistSlice";
import { addItemToCart } from "../../../Redux Toolkit/Customer/CartSlice";

interface ProductCardProps {
  item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromWishlist = (e: MouseEvent) => {
    e.stopPropagation();
    if (!item.id) return;
    dispatch(removeProductFromWishlist({ productId: item.id }));
    toast.success("Removed from wishlist");
  };

  const handleMoveToCart = (e: MouseEvent) => {
    e.stopPropagation();
    if (!item?.id) return;
  
    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("jwt"),
        request: {
          productId: item.id,
          size: "",
          quantity: 1,
        },
      })
    );
  
    dispatch(removeProductFromWishlist({ productId: item.id }));
  
    toast.success("Moved to cart");
  };
  



  return (
    <div className="w-60 relative mb-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full relative">
        <img
          className="w-full h-60 object-cover"
          src={item.images?.[0] || "/fallback-image.png"}
          alt={`product-${item.title}`}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={handleRemoveFromWishlist}
            className="text-black text-xl cursor-pointer hover:text-gray-800"
            title="Remove from wishlist"
          >
            <CloseIcon sx={{ color: teal[500], fontSize: "1.5rem" }} />
          </button>
          <button
            onClick={handleMoveToCart}
            className="text-green-600 text-xl cursor-pointer hover:text-green-800"
            title="Move to cart"
          >
            <ShoppingCartIcon sx={{ color: teal[500], fontSize: "1.5rem" }} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="font-medium truncate">{item.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold text-gray-800">₹{item.sellingPrice}</span>
          <span className="text line-through text-gray-400">₹{item.mrpPrice}</span>
          <span className="text-[#f70505] font-semibold">{item.discountPercent}% off</span>
        </div>
        <button
          onClick={handleMoveToCart}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 mt-3 w-full"
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
