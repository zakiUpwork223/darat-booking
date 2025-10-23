import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../lib/services/api";

export const getCustomerDetailsByToken = async (setCustomerID) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/auth/userData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomerID(response.data.id);
        localStorage.setItem("customerId", response.data.id);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
};

export const fetchItems = async (setItems) => {
  try {
    const response = await api.get("/menu/items");
    setItems(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

export const addtocart = async (payload) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post("/cart/update-cart", payload);
        if (response.data) {
          toast.success("Item added successfully to cart");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }
};


export const getCustomerCart = async (setCartItems) => {
  try {

    if (typeof localStorage !== "undefined") {
      const customerId = localStorage.getItem("customerId");
      if (customerId) {
        const cartResponse = await api.post(`/cart/get-cart`, {
          customer_id: customerId,
        });
        console.log(cartResponse.data.cart.cartItems.map(item => item.variantId))
        setCartItems(cartResponse.data);
      } else {
     
        console.error("customerId not found in localStorage");
      }
    } else {
 
      console.error("localStorage is not available");
    }
  } catch (error) {
    console.error("Error fetching customer cart:", error);
  }
};