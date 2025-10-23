"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { RemoveCircle, AddCircle } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCart,
  addToCart,
} from "../../../../lib/redux/slices/cartSlice";

const useStyles = makeStyles({
  highlightedSize: {
    borderBottom: "2px solid black",
  },
  disabledSize: {
    pointerEvents: "none",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

const ProCard = ({ product }) => {
  const [showAddToCart, setShowAddToCart] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartStatus, setAddToCartStatus] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.customerCart);
  useEffect(() => {
    if (cartData.data && product.variantId) {
      const isInCart = cartData.data.cart.cartItems.some(
        (item) => item.variantId === product.variantId[0].id
      );
      setAddToCartStatus(isInCart);
      const cartItem = cartData.data.cart.cartItems.find(
        (item) => item.variantId === product.variantId[0].id
      );
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    }
  }, [product.variantId, cartData]);

  const handleAddtoCart = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        dispatch(
          addToCart({
            customer_id: localStorage.getItem("customerId"),
            variant_id: product.variantId[0].id,
            quantity: quantity,
            category_id: product.categoryId,
          })
        );
      } else {
        router.push("/login");
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(deleteItemFromCart(productId));
    setShowUpdateButton(false);
  };

  const STYLE = useStyles();

  const handleVariantClick = (index) => {
    setSelectedVariant(index === selectedVariant ? null : index);
  };

  const clearSelection = () => {
    setSelectedVariant(null);
  };

  const handleMouseEnter = () => {
    setShowAddToCart(true);
  };

  const handleMouseLeave = () => {
    if (selectedVariant === null) {
      setShowAddToCart(false);
    }
  };

  const handleAddQuantity = (id) => {
   if(cartData.data){
    const prevQuantity = cartData.data.cart.cartItems.find(
      (item) => item.variantId === id
    );
    if (prevQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setShowUpdateButton(prevQuantity.quantity !== quantity + 1);
    } else {
      setQuantity(quantity + 1);
    }
   }
   else{
    router.push('/login');
   }
  };

  const handleSubtractQuantity = (id) => {
    const prevQuantity = cartData.data.cart.cartItems.find(
      (item) => item.variantId === id
    );
    if (prevQuantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setShowUpdateButton(prevQuantity.quantity !== quantity - 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleCancelButton = (id) => {
    const prevQuantity = cartData.data.cart.cartItems.find(
      (item) => item.variantId === id
    );
    if (prevQuantity) {
      setQuantity(prevQuantity.quantity);
      setShowUpdateButton(false);
    }
  };

  const handleUpdateButton = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        dispatch(
          addToCart({
            customer_id: localStorage.getItem("customerId"),
            variant_id: product.variantId[0].id,
            quantity: quantity,
            category_id: product.categoryId,
          })
        );
        setShowUpdateButton(false);
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <Card
      sx={{
        height: 540,
        cursor: "pointer",
        borderRadius: "12px",
        transform: showAddToCart ? "translateY(-2%)" : "translateY(0)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        src={product.attachment}
        height="70%"
        alt={product.name}
        sx={{
          flex: "1",
          "@media (min-width: 600px)": {
            maxWidth: "80%",
          },
          "@media (min-width: 800px)": {
            maxWidth: "100%",
          },
          "@media (min-width: 1280px)": {
            maxWidth: "100%",
          },
        }}
      />
      <CardContent
        sx={{
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          transform: showAddToCart ? "translateY(-30%)" : "translateY(-10%)",
          transition: "transform 0.7s ease",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            "&:hover": {
              color: `#333`,
            },
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: "flex" }}>
          {product.discounts.length > 0 ? (
            <Box sx={{ display: "flex" }}>
              <Typography component="p" fontWeight={300} fontSize={18}>
                <s> {product.variantId[0].price + "ریال"}</s>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                fontWeight={350}
                fontSize={21}
                ml={1}
              >
                {Number(
                  product.variantId[0].price -
                    (product.variantId[0].price / 100) *
                      product.discounts[0].discount.value
                ).toFixed(2) + "ریال"}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              component="p"
              fontWeight={350}
              fontSize={21}
            >
              {product.variantId[0].price + "ریال"}
            </Typography>
          )}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "30px",
              marginTop: "5px",
              animation: "slide-in-bottom 0.5s ease-in-out",
            }}
          >
            {quantity > 1 ? (
              <RemoveCircle
                onClick={() => handleSubtractQuantity(product.variantId[0].id)}
              />
            ) : (
              <RemoveCircle />
            )}

            <Typography
              style={{
                width: "40px",
                textAlign: "center",
                color: "#333",
                fontSize: 20,
                fontWeight: 100,
              }}
            >
              {quantity}
            </Typography>

            <AddCircle
              color="black"
              onClick={() => handleAddQuantity(product.variantId[0].id)}
            />
          </Box>
        </Box>

        <Box style={{ display: "flex" }}>
          {product.variantId &&
            product.variantId.map((variant, index) => (
              <div key={index}>
                <Typography
                  key={index}
                  className={`${
                    selectedVariant === index ? STYLE.highlightedSize : ""
                  }
                       ${selectedVariant === index ? STYLE.disabledSize : ""}`}
                  variant="body1"
                  component="p"
                  fontWeight={600}
                  fontSize={14}
                  mb="4px"
                  onClick={() => handleVariantClick(index)}
                  sx={{
                    color: "#242424",
                    cursor: "pointer",
                    "&:hover": {
                      color: `#777777`,
                    },
                  }}
                >
                  {variant.size}
                </Typography>
              </div>
            ))}
        </Box>

        {selectedVariant !== null && (
          <Typography color="#242424" fontSize={15}>
            In Stock - {product.variantId[selectedVariant].stock} left!
          </Typography>
        )}

        {selectedVariant !== null && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              opacity: "1",
              fontSize: "12px",
            }}
            onClick={clearSelection}
            color="#9e9e9e"
            mt="2px"
          >
            <ClearIcon style={{ fontSize: "12px" }} />
            <Typography fontSize={12}>Clear</Typography>
          </Box>
        )}

        {!addToCartStatus ? (
          <Box mt={1}>
            <ThemeProvider theme={theme}>
              <Button
                onClick={handleAddtoCart}
                variant="contained"
                fullWidth
                color="primary"
                disableElevation
                sx={{
                  borderRadius: "35px",
                  textTransform: "none",
                  visibility: showAddToCart ? "visible" : "hidden",
                  "&:hover": {
                    backgroundColor: `#333`,
                  },
                }}
              >
                Add to cart
              </Button>
            </ThemeProvider>
          </Box>
        ) : (
          <Box>
            {showUpdateButton ? (
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box mt={1}>
                  <ThemeProvider theme={theme}>
                    <Button
                      onClick={handleUpdateButton}
                      variant="contained"
                      fullWidth
                      color="primary"
                      disableElevation
                      sx={{
                        borderRadius: "35px",
                        textTransform: "none",
                        backgroundColor: "#141E46",
                        visibility: showAddToCart ? "visible" : "hidden",
                        "&:hover": {
                          backgroundColor: `#141E46`,
                        },
                      }}
                    >
                      update cart
                    </Button>
                  </ThemeProvider>
                </Box>
                <Box mt={1}>
                  <ThemeProvider theme={theme}>
                    <Button
                      onClick={() =>
                        handleCancelButton(product.variantId[0].id)
                      }
                      variant="contained"
                      fullWidth
                      color="primary"
                      disableElevation
                      sx={{
                        borderRadius: "35px",
                        textTransform: "none",
                        backgroundColor: "#B31312",
                        visibility: showAddToCart ? "visible" : "hidden",
                        "&:hover": {
                          backgroundColor: `#B31312`,
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </ThemeProvider>
                </Box>
              </Box>
            ) : (
              <Box mt={1}>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={() =>
                      handleRemoveFromCart(product.variantId[0].id)
                    }
                    variant="contained"
                    fullWidth
                    color="primary"
                    disableElevation
                    sx={{
                      borderRadius: "35px",
                      textTransform: "none",
                      backgroundColor: "#B31312",
                      visibility: showAddToCart ? "visible" : "hidden",
                      "&:hover": {
                        backgroundColor: `#B31312`,
                      },
                    }}
                  >
                    remove from cart
                  </Button>
                </ThemeProvider>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProCard;
