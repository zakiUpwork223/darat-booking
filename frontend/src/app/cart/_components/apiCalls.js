import api from "../../../../lib/services/api";

export const getCustomerCart = async (setCartItems) => {
  try {

    if (typeof localStorage !== "undefined") {
      const customerId = localStorage.getItem("customerId");
      if (customerId) {
        const cartResponse = await api.post(`/cart/get-cart`, {
          customer_id: customerId,
        });
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

export const deleteItem = async (variantId) => {
  try {
   
    if (typeof localStorage !== "undefined") {
      const customerId = localStorage.getItem("customerId");
      if (customerId) {
        await api.post("/cart/remove-cart-item", {
          customer_id: customerId,
          variant_id: variantId,
        });
      } else {
        
        console.error("customerId not found in localStorage");
      }
    } else {
   
      console.error("localStorage is not available");
    }
  } catch (error) {
    console.error("Error deleting item from customer cart:", error);
  }
};
