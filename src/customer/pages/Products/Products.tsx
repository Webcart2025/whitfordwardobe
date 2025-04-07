import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Customer/ProductSlice";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { Product } from "../../../types/productTypes";

const Products = () => {
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber: page - 1,
      minDiscount: searchParams.get("discount") ? Number(searchParams.get("discount")) : undefined,
    };
      dispatch(getAllProducts({ sort, ...newFilters }));
  }, [searchParams, categoryId, sort, page, dispatch]);

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-800 pb-5 uppercase">
        {categoryId?.split("_").map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </h1>

      <div className="flex flex-col items-start">
        <FormControl 
          size="small" 
          sx={{ 
            width: "200px", 
            marginBottom: "16px",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important"
              }
            }
          }}
        >
          <InputLabel 
            id="sort-label" 
            sx={{ 
              color: "black",
              "&.Mui-focused": {
                color: "black"
              }
            }}
          >
            Sort By
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort By"
            sx={{ 
              color: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important"
              }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white"
                    },
                    "&.Mui-selected": {
                      backgroundColor: "black",
                      color: "white"
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "black",
                      color: "white"
                    }
                  }
                }
              }
            }}
          >
            <MenuItem value="">Featured</MenuItem>
            <MenuItem value="price_low">Price: Low to High</MenuItem>
            <MenuItem value="price_high">Price: High to Low</MenuItem>
            <MenuItem value="rating_high">Highest Rated</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider />

      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <ImageSlider />
      </section>

      {products?.products?.length > 0 ? (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {products.products.map((item : Product) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center h-[67vh] border rounded-lg bg-gray-50 mt-6">
          <img
            className="w-60 sm:w-80"
            src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
            alt="Not Found"
          />
          <h1 className="font-bold text-lg sm:text-xl text-center mt-4 text-gray-700">
            No Products Found
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Try adjusting your filters or search criteria
          </p>
        </section>
      )}

      {products?.totalPages > 1 && (
        <div className="flex justify-center pt-8 pb-4">
          <Pagination
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            count={products?.totalPages || 1}
            shape="rounded"
            size={isLarge ? "large" : "medium"}
          />
        </div>
      )}
    </div>
  );
};

export default Products;