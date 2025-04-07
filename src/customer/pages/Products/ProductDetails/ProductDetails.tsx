import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Divider, Typography, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ZoomableImage from "./ZoomableImage";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, getAllProducts } from "../../../../Redux Toolkit/Customer/ProductSlice";
import { addItemToCart } from "../../../../Redux Toolkit/Customer/CartSlice";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import SmilarProduct from "../SimilarProduct/SmilarProduct";
import { isWishlisted } from "../../../../util/isWishlisted";
import { addProductToWishlist, removeProductFromWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from "react-toastify";
import RatingCard from "../../Review/RatingCard";
import ProductReviewCard from "../../Review/ProductReviewCard";
import { fetchReviewsByProductId } from "../../../../Redux Toolkit/Customer/ReviewSlice";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "100%",
  boxShadow: 24,
  outline: "none",
  backgroundColor: 'white'
};

const SIZES = [ "M", "L", "XL"];

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState("");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store.products);
  const { review } = useAppSelector(store => store)
  const { wishlist: wishlistItems } = useAppSelector((store) => store.wishlist);
  const navigate = useNavigate();
  const { productId ,categoryId} = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId, dispatch]);

   useEffect(() => {
  
          if (productId) {
              dispatch(fetchProductById(Number(productId)))
              dispatch(fetchReviewsByProductId({ productId: Number(productId) }))
              
            }
          
  
      }, [productId , dispatch]);
  

  useEffect(() => {
    if (product?.id && wishlistItems) {
      setWishlist(isWishlisted(wishlistItems, product));
    }
  }, [product, wishlistItems]);

  const handleAddCart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  
    // ✅ Check for login
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.error("Please login to add items to your cart.");
      navigate("/login");
      return;
    }
  
    // ✅ Check for size selection
    if (!selectedSize) {
      setSizeError("Please select a size before adding to the cart.");
      return;
    }
  
    setSizeError("");
  
    // ✅ Add to cart
    dispatch(
      addItemToCart({
        jwt: jwt,
        request: {
          productId: Number(productId),
          size: selectedSize,
          quantity: 1,
        },
      })
    );
  
    navigate("/cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleWishlist = () => {
    // ✅ Check for login
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.error("Please login to manage your wishlist.");
      navigate("/login");
      return;
    }
  
    // ✅ Toggle wishlist state and dispatch actions
    setWishlist((prev) => !prev);
    if (wishlist) {
      dispatch(removeProductFromWishlist({ productId: Number(productId) }));
    } else {
      dispatch(addProductToWishlist({ productId: Number(productId) }));
    }
  };
  

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Responsive layout - tabs for desktop, accordion for mobile
  const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-white">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Product Images and Basic Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery - Left Column */}
          <div className="flex flex-col">
            <div className="w-full h-auto max-h-[600px] mb-4">
              <img
                onClick={() => setOpen(true)}
                className="w-full h-full object-contain rounded-md cursor-zoom-out border border-gray-200"
                src={product?.images?.[selectedImage] || "/fallback-image.png"}
                alt="Selected Product"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto py-2">
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product thumbnail ${index}`}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border ${selectedImage === index ? 'border-black' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info - Right Column */}
          <div className="sticky top-4">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product?.title}</h1>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} fontSize="small" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
              </div>
              <div className="flex items-center gap-3 my-2">
                <span className="text-xl font-bold text-gray-900">₹{product?.sellingPrice}</span>
                <span className="line-through text-gray-400">₹{product?.mrpPrice}</span>
                <span className="text-red-600 font-semibold">{product?.discountPercent}% off</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-6">{product?.description}</p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-gray-900 font-bold text-lg">SELECT SIZE</h4>
                  <button 
                    onClick={() => setSizeChartOpen(true)}
                    className="text-black underline text-sm font-medium"
                  >
                    SIZE GUIDE
                  </button>

                  {sizeChartOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-opacity">
          <div className="bg-white rounded-lg max-w-3xl w-full relative shadow-lg">
            
            {/* Close Button */}
            <button
              onClick={() => setSizeChartOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-center mb-4">Size Guide</h2>
              <img
                src="/SizeChart.png" // <-- Make sure this path is correct
                alt="Size Chart"
                className="w-full max-h-[400px] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

                </div>

                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError("");
                      }}
                      className={`w-14 h-10 flex items-center justify-center border rounded-sm text-sm font-medium transition-colors
                        ${selectedSize === size ? 
                          'bg-black text-white border-black' : 
                          'bg-white text-black border-gray-300 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && <p className="text-red-500 text-sm mt-2">{sizeError}</p>}
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex flex-col sm:flex-row gap-3">
              <button
          onClick={handleAddCart}
          className="flex-1 bg-black text-white py-3 px-4 rounded-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
          <AddShoppingCartIcon fontSize="small" />
          ADD TO BAG
          </button>

                  
                <button
                  onClick={handleWishlist}
                  className={`flex-1 py-3 px-4 rounded-sm font-medium flex items-center justify-center gap-2 transition-colors
                    ${wishlist ? 
                      'text-red-500 border border-red-500 hover:bg-red-50' : 
                      'text-black border border-black hover:bg-gray-50'}`}
                >
                  {wishlist ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                  WISHLIST
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Section */}
        <section className="mb-16">
          {isMobile ? (
            // Mobile - Accordion View
            <div className="space-y-2">
              <Accordion elevation={0} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="font-bold">PRODUCT DETAILS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph className="text-gray-700">{product?.description}</Typography>
                  <Typography variant="subtitle2" className="font-bold mt-4 mb-2">FABRIC & CARE</Typography>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>100% Cotton</li>
                    <li>Machine wash cold</li>
                    <li>Do not bleach</li>
                    <li>Iron on low heat</li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="font-bold">SIZE & FIT</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph className="text-gray-700">
                    This product fits true to size. If you're between sizes, we recommend sizing up.
                  </Typography>
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Size</th>
                          <th className="border p-2 text-left">Chest (in)</th>
                          <th className="border p-2 text-left">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <tr key={size}>
                            <td className="border p-2">{size}</td>
                            <td className="border p-2">{36 + (['S', 'M', 'L', 'XL'].indexOf(size) * 2)}</td>
                            <td className="border p-2">{27 + ['S', 'M', 'L', 'XL'].indexOf(size)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="font-bold">REVIEWS (24)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex items-center mb-4">
                    <div className="mr-4 text-center">
                      <Typography variant="h5" className="font-bold">4.8</Typography>
                      <Typography variant="caption">out of 5</Typography>
                    </div>
                    <div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className={star <= 4 ? "text-yellow-500" : "text-gray-300"} fontSize="small" />
                        ))}
                        <Typography variant="caption" className="ml-2">24 reviews</Typography>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2].map((review) => (
                      <div key={review} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center mb-1">
                          <div className="flex text-yellow-500 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} fontSize="small" />
                            ))}
                          </div>
                          <Typography variant="caption" className="text-gray-500">Verified Purchase</Typography>
                        </div>
                        <Typography variant="subtitle1" className="font-medium">Perfect fit!</Typography>
                        <Typography variant="body2" className="text-gray-700">
                          The quality is amazing and it fits perfectly. I would definitely recommend this product.
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Reviewed by John D. on October 12, 2023
                        </Typography>
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            // Desktop - Tab View
            <div>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                className="border-b border-gray-200"
              >
                <Tab label="PRODUCT DETAILS" className="font-bold" />
                <Tab label="SIZE & FIT" className="font-bold" />
                <Tab label="REVIEWS (24)" className="font-bold" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <div>
                    <Typography variant="h6" className="font-bold mb-3">Product Description</Typography>
                    <Typography paragraph className="text-gray-700">{product?.description}</Typography>
                    
                    <Typography variant="h6" className="font-bold mt-6 mb-3">Fabric & Care</Typography>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>100% Cotton</li>
                      <li>Machine wash cold</li>
                      <li>Do not bleach</li>
                      <li>Iron on low heat</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 1 && (
                  <div>
                    <Typography variant="h6" className="font-bold mb-3">Size Guide</Typography>
                    <Typography paragraph className="text-gray-700">
                      This product fits true to size. If you're between sizes, we recommend sizing up.
                    </Typography>
                    
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Size</th>
                            <th className="border p-2 text-left">Chest (in)</th>
                            <th className="border p-2 text-left">Length (in)</th>
                            <th className="border p-2 text-left">Sleeve (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['S', 'M', 'L', 'XL'].map((size) => (
                            <tr key={size} className={['S', 'M', 'L', 'XL'].indexOf(size) % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border p-2">{size}</td>
                              <td className="border p-2">{36 + (['S', 'M', 'L', 'XL'].indexOf(size) * 2)}</td>
                              <td className="border p-2">{27 + ['S', 'M', 'L', 'XL'].indexOf(size)}</td>
                              <td className="border p-2">{23.5 + (['S', 'M', 'L', 'XL'].indexOf(size) * 0.5)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 2 && (
  <div className="ratings w-full mt-10">
    <h1 className="font-semibold text-lg pb-4">Review & Ratings</h1>

    <RatingCard totalReview={review.reviews.length} />

    <div className="mt-10">
      <div className="space-y-5">
        {review.reviews.map((item, i) => (
          <div key={i} className="space-y-5">
            <ProductReviewCard item={item} />
            <Divider />
          </div>
        ))}
        <Button onClick={() => navigate(`/reviews/${productId}`)}>
          View All {review.reviews.length} Reviews
        </Button>
      </div>
    </div>
  </div>
)}

              </Box>
            </div>
          )}
        </section>

        {/* Similar Products Section */}
        <section className="mb-16">
          <Typography variant="h5" className="font-bold text-center mb-8">
            SIMILAR PRODUCTS
          </Typography>
          <SmilarProduct categoryId={product?.category?.categoryId || 0} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;