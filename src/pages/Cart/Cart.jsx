import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import CartItem from "../../components/CartItem/CartItem.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { getCartProducts, cartProducts, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartProducts === null ? (
        <Loading />
      ) : (
        <>
          <section>
            <div className="flex items-center gap-8">
              <i className="fa-brands fa-opencart text-3xl"></i>
              <h2 className="pl-4 text-x text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 ">
                Your Shopping Cart
              </h2>
            </div>

            {cartProducts.numOfCartItems === 0 ? (
              <div className=" mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-2">
                <h2>
                  Oops! Your cart is empty. Start shopping now by clicking the
                  button below and find something you love!
                </h2>
                <Link
                  to="/"
                  className=" btn bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4 mt-6">
                  {cartProducts.data.products.map((product) => (
                    <CartItem key={product._id} productInfo={product} />
                  ))}
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <p className=" text-xl">
                    <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>{" "}
                    Your Total Cart Price
                    <span className="text-primary-700 ml-2 font-bold">
                      {cartProducts.data.totalCartPrice}
                    </span>
                  </p>
                  <button
                    onClick={clearCart}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    <i className="fa-solid fa-trash mr-2"></i>Clear Cart
                  </button>
                </div>

                <Link
                  to={"/checkout"}
                  className="mt-8 w-full text-center inline-block btn bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Next Step
                </Link>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
