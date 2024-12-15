import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState(null);

  // ^ add product in cart
  async function addProductToCart({ productId }) {
    const toastId = toast.loading("Adding Product...");
    try {
      const options = {
        method: "POST",
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ^ get all cart
  async function getCartProducts() {
    try {
      const options = {
        method: "GET",
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setCartProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  // ^ remove product from cart
  async function removeProductFromCart({ productId }) {
    const toastId = toast.loading("Deleting Product...");
    try {
      const options = {
        method: "DELETE",
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product has been deleted");
        setCartProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ^ clear cart
  async function clearCart() {
    const toastId = toast.loading("Clearing Cart...");
    try {
      const options = {
        method: "DELETE",
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Cart has been cleared");
        setCartProducts({ numOfCartItems: 0 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ^ update count
  async function updateProductCount({ productId, count }) {
    try {
      const options = {
        method: "PUT",
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        headers: {
          token,
        },
        data: { count },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setCartProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        removeProductFromCart,
        clearCart,
        updateProductCount,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
