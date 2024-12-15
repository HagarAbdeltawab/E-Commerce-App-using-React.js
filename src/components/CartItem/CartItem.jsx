import { useContext } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { removeProductFromCart, updateProductCount } = useContext(CartContext);
  const { count, price, product } = productInfo;
  const { title, imgCover, category, id } = product;
  return (
    <>
      <div className="cart-item bg-gray-100 py-4 px-6 flex justify-between items-center">
        <img
          src={imgCover}
          alt=""
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <h3 className="text-lg text-gray-700 font-semibold w-5/12">
          <Link to={`/product/${id}`}>{title}</Link>
        </h3>
        <h4 className=" text-gray-500 font-semibold">{category.name}</h4>

        <div className="count flex items-center justify-between w-20">
          <div
            onClick={() => {
              updateProductCount({ productId: id, count: count + 1 });
            }}
            className="plus w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer"
          >
            <i className="fa-solid fa-plus text-sm"></i>
          </div>

          <span className="text-lg">{count}</span>

          <div
            onClick={() => {
              updateProductCount({ productId: id, count: count - 1 });
            }}
            className="minus w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer"
          >
            <i className="fa-solid fa-minus text-sm"></i>
          </div>
        </div>

        <span>{price} EGP</span>

        <button
          onClick={() => {
            removeProductFromCart({ productId: id });
          }}
        >
          <i className=" fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
