import { useContext } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { removeProductFromCart, updateProductCount } = useContext(CartContext);
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  return (
    <>
      <div className="cart-item bg-gray-100 py-4 px-6 flex items-center">
        <img
          src={imageCover}
          alt=""
          className=" w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <div className="pl-10 space-y-4 ">
          <h3 className="text-lg text-gray-700 font-semibold line-clamp-1">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <h4 className=" text-primary-600 font-semibold">{category.name}</h4>

          <div className="count flex items-center justify-between pb-2 w-32">
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

          <span className="font-semibold"><span className="text-primary-800">{price}</span> EGP</span>
        </div>

        <button
          className="ml-auto"
          onClick={() => {
            removeProductFromCart({ productId: id });
          }}
        >
          <i className=" fa-solid fa-xmark "></i>
        </button>
      </div>
    </>
  );
}
