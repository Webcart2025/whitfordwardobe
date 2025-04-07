import {
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import DrawerList from "./DrawerList";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { user, cart } = useAppSelector((store) => store);
  const navigate = useNavigate();

  // ✅ Corrected toggleDrawer function
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Box className="sticky top-0 left-0 right-0 bg-white bg-opacity-90 z-50">
      {/* ✅ Animated Scrolling Text */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap">
        <div className="marquee">
          Trendy Oversize T-Shirt & 100% Cotton Quality - Shop Now!
        </div>
      </div>

      <div className="flex items-center justify-between px-2 md:px-4 lg:px-10 h-[70px]">
        
        {!isLarge && (
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon className="text-gray-800" sx={{ fontSize: 28 }} />
          </IconButton>
        )}

        <img
          src="/Whitford_Logo.png"
          alt="WITHFORD Logo"
          className="cursor-pointer h-10"
          onClick={() => navigate("/")}
        />

        {isLarge ? (
          <div className="flex items-center gap-4">
            <span
              onClick={() => navigate("/products/Over_Sized_T-Shirt")}
              className="hover:text-[black] cursor-pointer hover:border-b-2 border-[black] flex items-center"
            >
              Oversized
            </span>

            <IconButton onClick={() => navigate("/search-products")}>
              <SearchIcon className="text-gray-800" sx={{ fontSize: 28 }} />
            </IconButton>

            <IconButton 
              onClick={() => navigate("/wishlist")} 
              sx={{ "&:hover svg": { color: "red" } }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 28, color: "black" }} />
            </IconButton>

            {user?.user ? (
              <IconButton onClick={() => navigate("/account/orders")}>
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                  alt="User Avatar"
                />
              </IconButton>
            ) : (
              <IconButton onClick={() => navigate("/login")}>
                <AccountCircleIcon className="text-gray-800" sx={{ fontSize: 28 }} />
              </IconButton>
            )}

            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart?.cart?.cartItems.length || 0} color="error">
                <AddShoppingCartIcon className="text-gray-800" sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>

          </div>
        ) : (
          user?.user ? (
            <IconButton onClick={() => navigate("/account/orders")}>
              <Avatar
                sx={{ width: 28, height: 28 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                alt="User Avatar"
              />
            </IconButton>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <AccountCircleIcon className="text-gray-800" sx={{ fontSize: 28 }} />
            </IconButton>
          )
        )}
      </div>

      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>
  );
};

export default Navbar;
