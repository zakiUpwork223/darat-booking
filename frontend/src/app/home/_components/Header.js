"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../../lib/services/api";
import { useDispatch } from "react-redux";
import { setState } from "../../../../lib/redux/slices/authSlice";
import { clearCart } from "../../../../lib/redux/slices/cartSlice";
import Search from "./Search"

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await api.get("auth/userData", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    router.push("/login");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    localStorage.removeItem("role");
    setToken(null);
    setUserData(null);
    dispatch(setState());
    dispatch(clearCart());
    handleMenuClose();
    router.push("/home");
  };

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "90%",
        margin: "auto",
      }}
    >
      <Box>
        <Image src="/logo.webp" alt="logo_img" width={300} height={100} />
      </Box>
    <Search/>
      <Box
        sx={{ display: "flex", gap: 1, mt: 5, cursor: "pointer" }}
        onClick={handleMenuOpen}
      >
        <Avatar
          src={userData ? userData.profilePic : "/default_avatar.png"}
          alt={userData ? userData.name : "User"}
          sx={{ width: 30, height: 30 }}
        />
        <Typography variant="h6">
          {userData ? userData.name : "User"}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {!token && <MenuItem onClick={handleLogin}>Log in</MenuItem>}
        {token && <MenuItem onClick={handleLogout}>Log out</MenuItem>}
      </Menu>
    </Box>
  );
}

export default Header;
