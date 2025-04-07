// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   CircularProgress,
//   Box,
//   IconButton,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchSellerProducts,
//   updateProduct,
// } from "../../../Redux Toolkit/Seller/sellerProductSlice";
// import { Product } from "../../../types/productTypes";
// import { Delete } from "@mui/icons-material";


// export default function EditProduct() {
//   const { productId } = useParams<{ productId: string }>();
//    // ✅ Get product ID from URL
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
    
//   console.log("Editing product ID:", productId); // ✅ Debugging

//   // ✅ Get seller product state
//   const sellerProduct = useAppSelector((store) => store.sellerProduct);
//   const loading = useAppSelector((store) => store.sellerProduct.loading);

//   // ✅ Fetch product list if it's empty
//   useEffect(() => {
//     if (!sellerProduct.products.length) {
//       dispatch(fetchSellerProducts(localStorage.getItem("jwt"))); // ✅ Fetch products if empty
//     }
//   }, [dispatch, sellerProduct.products.length]);
  
//   // ✅ Find product by ID
//   const product: Product | undefined = sellerProduct.products.find(
//     (item: Product) => item.id === Number(productId)
//   );

//   // ✅ State for form fields
//   const [title, setTitle] = useState("");
//   const [mrpPrice, setMrpPrice] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [color, setColor] = useState("");
//   const [description, setDescription] = useState("");
//   const [sizes, setSizes] = useState<string[]>([]);
//   const [images, setImages] = useState<string[]>([]);

//   // ✅ Populate form fields when product is available
//   useEffect(() => {
//     if (product) {
//       setTitle(product.title || "");
//       setMrpPrice(String(product.mrpPrice || 0));
//       setSellingPrice(String(product.sellingPrice || 0));
//       setColor(product.color || "");
//       setDescription(product.description || "");
//       setSizes(Array.isArray(product.sizes) ? product.sizes : []); // ✅ Ensure `sizes` is an array
//       setImages(Array.isArray(product.images) ? product.images : []);
//     }
//   }, [product]);
  
  

//   // ✅ Handle update
//   const handleUpdate = () => {
//     if (!productId) return;
  
//     const updatedProduct = {
//       id,
//       title,
//       mrpPrice: Number(mrpPrice),
//       sellingPrice: Number(sellingPrice),
//       color,
//       description,
//       sizes,
//       images,
//     };
  
//     console.log("Updating product:", updatedProduct); // ✅ Check updated values before dispatch
  
//     dispatch(updateProduct({ productId: Number(productId), product: updatedProduct }))
//       .then(() => {
//         console.log("Product updated successfully");
//         navigate("/seller/products"); // ✅ Redirect after update
//       })
//       .catch((error) => console.error("Update failed:", error));
//   };


//    // Handle image add (via input or manually)
//    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const newImages = Array.from(event.target.files).map(file => URL.createObjectURL(file));
//       setImages([...images, ...newImages]);
//     }
//   };

//   // Handle image removal
//   const handleRemoveImage = (image: string) => {
//     setImages(images.filter((img) => img !== image));
//   };

//   // ✅ Show loading indicator
//   if (loading) {
//     return (
//       <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", marginTop: 4 }}>
//         <Typography variant="h5">Loading Product...</Typography>
//         <CircularProgress />
//       </Paper>
//     );
//   }

//   // ✅ If product is not found
//   if (!product) {
//     return (
//       <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", marginTop: 4 }}>
//         <Typography variant="h5" color="error">
//           Product not found!
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", marginTop: 4 }}>
//       <Typography variant="h5" sx={{ marginBottom: 2 }}>
//         Edit Product
//       </Typography>

      

//       <TextField
//         fullWidth
//         label="Title"
//         variant="outlined"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="MRP Price"
//         variant="outlined"
//         type="number"
//         value={mrpPrice}
//         onChange={(e) => setMrpPrice(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="Selling Price"
//         variant="outlined"
//         type="number"
//         value={sellingPrice}
//         onChange={(e) => setSellingPrice(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="Color"
//         variant="outlined"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="Description"
//         variant="outlined"
//         multiline
//         rows={3}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         sx={{ marginBottom: 2 }}
//       />
//       <TextField
//         fullWidth
//         label="Sizes (comma-separated)"
//         variant="outlined"
//         value={sizes.join(", ")}
//         onChange={(e) => setSizes(e.target.value.split(",").map((size) => size.trim()))}
//         sx={{ marginBottom: 2 }}
//       />

      
//       {/* Image Preview Section */}
//       <Box sx={{ marginBottom: 2 }}>
//         <Typography variant="h6">Product Images</Typography>
//         <Box display="flex" flexWrap="wrap" gap={2}>
//           {images.map((image, index) => (
//             <Box key={index} position="relative">
//               <img src={image} alt={`Product image ${index}`} width={100} height={100} style={{ objectFit: 'cover' }} />
//               <IconButton
//                 sx={{ position: "absolute", top: 0, right: 0 }}
//                 color="error"
//                 onClick={() => handleRemoveImage(image)}
//               >
//                 <Delete />
//               </IconButton>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* Button for adding images */}
//       <Button
//         variant="outlined"
//         component="label"
//         sx={{ marginBottom: 2 }}
//       >
//         Add Images
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={handleAddImage}
//         />
//       </Button>

//       <Button variant="contained" color="primary" onClick={handleUpdate}>
//         Update Product
//       </Button>
//     </Paper>
//   );
// }
