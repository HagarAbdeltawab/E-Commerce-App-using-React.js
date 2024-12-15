import { useContext } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import { Link } from "react-router-dom";

export default function ProductCard({ productInfo }) {
  const { imageCover, category, title, price, ratingsAverage, id } =
    productInfo;
  const { addProductToCart } = useContext(CartContext);

  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className="relative">
          <img src={imageCover} alt="" className="w-full" />

          <div className=" layer flex gap-2 items-center justify-center absolute w-full h-full left-0 top-0 bg-black  bg-opacity-15 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-8 h-8 rounded-full bg-primary-900 text-sm text-white flex justify-center items-center">
              <i className=" fa-solid fa-heart"></i>
            </div>

            <div
              onClick={() => {
                addProductToCart({ productId: id });
              }}
              className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-8 h-8 rounded-full bg-primary-900 text-sm text-white flex justify-center items-center"
            >
              <i className=" fa-solid fa-shopping-cart"></i>
            </div>

            <Link
              to={`/product/${id}`}
              className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer w-8 h-8 rounded-full bg-primary-900 text-sm text-white flex justify-center items-center"
            >
              <i className=" fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>

        <div className="p-3">
          <header>
            <h2 className="text-lg font-semibold line-clamp-1">
              <Link to={`/product/${id}`}>{title}</Link>
            </h2>
            <h3 className="text-primary-900">{category.name}</h3>
          </header>
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGP</span>
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
