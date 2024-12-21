import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./User.context.jsx";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishArr, setWishArr] = useState([]);
  const [wishProducts, setWishProducts] = useState(null);
  // ^ add product in wishlist
  async function addProductToWishlist({ productId }) {
    const toastId = toast.loading("Adding Product...");
    try {
      const options = {
        method: "POST",
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        headers: { token },
        data: { productId },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setWishArr(data.data);
        getWishlistProducts();
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //^ remove product from wishlist
  async function removeProductFromWishlist({ productId }) {
    const toastId = toast.loading("removing Product...");
    try {
      const options = {
        method: "DELETE",
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        headers: { token },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setWishArr(data.data);
        getWishlistProducts();
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //^ get wishlist products
  async function getWishlistProducts() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        headers: { token },
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        setWishProducts(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishArr,
        wishProducts,
        addProductToWishlist,
        removeProductFromWishlist,
        getWishlistProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
