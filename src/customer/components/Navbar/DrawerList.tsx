import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DrawerListProps {
  toggleDrawer: (open: boolean) => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleDrawer(false); // ✅ Close the drawer after navigation
  };

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clears all stored user data (if stored)
    navigate("/login"); // ✅ Redirect to login page
    toggleDrawer(false); // ✅ Close the drawer
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {/* Logo */}
        <ListItem>
          <ListItemButton onClick={() => handleNavigate("/")}>
            <img src="/Whitford_Logo.png" alt="WITHFORD Logo" className="h-10 cursor-pointer" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {/* Search */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate("/search-products")}>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>

        {/* Oversized T-Shirts */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate("/products/Over_Sized_T-Shirt")}>
            <ListItemText primary="Oversized" />
          </ListItemButton>
        </ListItem>

        {/* Wishlist */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate("/wishlist")}>
            <ListItemText primary="Wishlist" />
          </ListItemButton>
        </ListItem>

        {/* Cart */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate("/cart")}>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {/* Logout */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" sx={{ color: "red", fontWeight: "bold" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DrawerList;
