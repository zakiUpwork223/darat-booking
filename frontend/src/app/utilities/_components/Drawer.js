"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Person3Icon from "@mui/icons-material/Person3";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { List, ListItem, Typography } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from '@mui/icons-material/Home';
import Info from "./Info";

const SidePanel = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setActiveItem(router.pathname);
  }, [router.pathname]);

  const listItemStyle = (path) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "19px",
    background: activeItem === path ? "rgb(240, 187, 55)" : "transparent",
    borderRadius: activeItem === path ? "8px" : "0",
    cursor: "pointer",
    "&:hover": {
      background: "rgb(240, 187, 55)",
      transition: "background-color 0.4s ease",
      borderRadius: "4px",
    },
  });

  const iconStyle = (path) => ({
    cursor: "pointer",
    fontSize: 30,
    color: activeItem === path ? "#fff" : "#fff",
    marginTop: 0.6,
  });

  const handleNavigation = (path) => {
    if (activeItem !== path) {
      router.push(path);
      setActiveItem(path);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          ml: 0,
          width: "70px",
          backgroundColor: "rgb(240, 187, 55)",
          height: "99vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List>
          <ListItem
            onClick={() => handleNavigation("/adminpanel")}
            sx={listItemStyle("/adminpanel")}
          >
            <HomeIcon sx={iconStyle("/adminpanel")} />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/doctors")}
            sx={listItemStyle("/doctors")}
          >
            <LocalHospitalIcon sx={iconStyle("/doctors")} />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/patientdata")}
            sx={listItemStyle("/patientdata")}
          >
            <Person3Icon sx={iconStyle("/patientdata")} />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/services-provided")}
            sx={listItemStyle("/services-provided")}
          >
            <MiscellaneousServicesIcon
              sx={iconStyle("/services-provided")}
            />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/admin-products")}
            sx={listItemStyle("/admin-products")}
          >
            <ProductionQuantityLimitsIcon
              sx={iconStyle("/admin-products")}
            />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/schedule")}
            sx={listItemStyle("/schedule")}
          >
            <CalendarMonthIcon sx={iconStyle("/schedule")} />
          </ListItem>

          <ListItem
            onClick={() => handleNavigation("/discount")}
            sx={listItemStyle("/discount")}
          >
            <DiscountIcon sx={iconStyle("/discount")} />
          </ListItem>
        </List>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List sx={{ mt: 1 }}>
        <ListItem
            sx={{
              ...listItemStyle("/adminpanel"),
              color: activeItem === "/adminpanel" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/adminpanel")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Home
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              ...listItemStyle("/doctors"),
              color: activeItem === "/doctors" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/doctors")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Doctor
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              ...listItemStyle("/patientdata"),
              color: activeItem === "/patientdata" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/patientdata")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Patient
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              ...listItemStyle("/services-provided"),
              color: activeItem === "/services-provided" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/services-provided")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Service
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              ...listItemStyle("/admin-products"),
              color: activeItem === "/admin-products" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/admin-products")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Product
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              ...listItemStyle("/schedule"),
              color: activeItem === "/schedule" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/schedule")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Schedule
            </Typography>
          </ListItem>

          <ListItem
            sx={{
              ...listItemStyle("/discount"),
              color: activeItem === "/discount" ? "#fff" : "black",
            }}
            onClick={() => handleNavigation("/discount")}
          >
            <Typography
              sx={{
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "600",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Discount
            </Typography>
          </ListItem>
        </List>
        <Info />
      </div>
    </div>
  );
};

export default SidePanel;
