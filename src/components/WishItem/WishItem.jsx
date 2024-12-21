import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlist.context.jsx";
import { CartContext } from "../../context/Cart.context.jsx";

export default function WishItem({ productInfo }) {
  const { removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const { imageCover, price, title, id } = productInfo;
  return (
    <>
      <div className="cart-item bg-gray-100 py-4 px-6 flex items-center">
        <img
          src={imageCover}
          alt=""
          className=" w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        
        <div className="pl-10 space-y-4 flex flex-col">
          <h3 className="text-lg text-gray-700 font-semibold line-clamp-1">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <span className="font-semibold">
            <span className="text-primary-800">{price}</span> EGP
          </span>
          <button
            className="btn w-32"
            onClick={() => {
              addProductToCart({ productId: id });
            }}
          >
            add to Cart
          </button>
        </div>

        <button
          className="ml-auto"
          onClick={() => {
            removeProductFromWishlist({ productId: id });
          }}
        >
          <i className=" fa-solid fa-xmark "></i>
        </button>
      </div>
    </>
  );
}
