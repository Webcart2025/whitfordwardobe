import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/productTypes";

interface ProductCardProps {
  item: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const navigate = useNavigate();
 

  // const handleAddWishlist = (event: MouseEvent) => {
  //   event.stopPropagation();
  //   if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
  // };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && item.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % item.images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  // const handleShowChatBot = (event: MouseEvent) => {
  //   event.stopPropagation();
  //   setShowChatBot(true);
  // };

  // const handleCloseChatBot = (event: MouseEvent) => {
  //   event.stopPropagation();
  //   setShowChatBot(false);
  // };

  return (
    <>
      <div
        onClick={() => {
          navigate(`/product/${item.id}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="group relative rounded-lg cursor-pointer bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-64 overflow-hidden rounded-md">
          <img
            className="w-full h-full object-cover transition-all duration-300"
            src={item.imageUrl || item.images[currentImage]}
            alt={item.name}
          />
          {/* <div className="absolute top-2 left-2 bg-white rounded-full p-1">
            {isWishlisted(item.id, wishlist.products) ? (
              <FavoriteIcon sx={{ color: teal[500] }} onClick={handleAddWishlist} />
            ) : (
              <FavoriteBorderIcon onClick={handleAddWishlist} />
            )}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
          {/* <p className="text-xs text-gray-500">{item.brand || "Overnized Tahir"}</p> */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900 text-sm">₹{item.sellingPrice}</span>
            <span className="line-through text-gray-400 text-xs">₹{item.mrpPrice}</span>
            <span className="text-[#d32f2f] font-semibold text-xs">
              {item.discountPercent ? `${item.discountPercent}% off` : ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;