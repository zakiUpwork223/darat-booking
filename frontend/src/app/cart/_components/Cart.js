"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem, getCustomerCart } from "./apiCalls";
import { useRouter } from "next/navigation";

export default function ProductData() {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("token")) {
        const fetchCartData = async () => {
          try {
            await getCustomerCart(setCartProducts);
            setLoader(false);
          } catch (error) {
            console.error("Error fetching cart data:", error);
            toast.error("Error fetching cart data");
          }
        };

        fetchCartData();
      } else {
        router.push("/login");
      }
    }
  }, []);

  const handleRemoveItem = (itemId) => {
    deleteItem(itemId);
    const updatedCart = {
      ...cartProducts,
      cart: {
        ...cartProducts.cart,
        cartItems: cartProducts.cart.cartItems.filter(
          (item) => item.variantId !== itemId
        ),
      },
    };
    setCartProducts(updatedCart);
    toast.success("Item removed from cart");
  };

  const calculateTotal = () => {
    let total = 0;
    cartProducts.cart.cartItems.forEach((item) => {
      if (item.variant.item_id.discounts.length > 0) {
        const discountValue = item.variant.item_id.discounts[0].discount.value;
        total +=
          item.quantity *
          (item.variant.price - (item.variant.price * discountValue) / 100);
      } else {
        total += item.quantity * item.variant.price;
      }
    });
    setTotal(total);
  };

  useEffect(() => {
    if (cartProducts.cart && cartProducts.cart.cartItems) {
      calculateTotal();
    }
  }, [cartProducts]);

  return (
    <Box display="flex" justifyContent="center">
      <Container maxWidth="lg">
        <Box mt={4} mb={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Shopping Cart
          </Typography>
          {loader ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 12,
              }}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Box>
          ) : (
            <>
              {cartProducts.cart.length < 1 ? (
                <Typography
                  variant="h6"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 12,
                  }}
                >
                  No Product Found
                </Typography>
              ) : (
                <Grid container spacing={3} mt={3}>
                  {cartProducts.cart.cartItems.map((item, index) => (
                    <Grid item key={index} xs={12}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.variant.item_id.attachment}
                          alt={item.variant.item_id.name}
                          sx={{ width: 150, height: 150, objectFit: "cover" }}
                        />
                        <Divider orientation="vertical" flexItem />
                        <CardContent>
                          <Typography variant="h6">
                            {item.variant.item_id.name}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Price:{" "}
                            {item.variant.item_id.discounts.length > 0
                              ? item.variant.price -
                              (item.variant.price *
                                item.variant.item_id.discounts[0].discount
                                  .value) /
                              100
                              : item.variant.price}{" "}
                            ریال
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <IconButton
                            aria-label="remove"
                            onClick={() => handleRemoveItem(item.variantId)}
                            sx={{ mt: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Typography sx={{}} variant="h4">
                Total Price: ریال {Number(total.toFixed(2))}
              </Typography>
            </>
          )}
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
}
