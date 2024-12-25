import { Helmet } from "react-helmet";
import { WishlistContext } from "../../context/wishlist.context.jsx";
import { useContext, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";
import WishItem from "../../components/WishItem/WishItem.jsx";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { getWishlistProducts, wishProducts, wishArr } =
    useContext(WishlistContext);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>wishlist</title>
      </Helmet>
      <section>
        <h2 className="pl-4 text-x text-slate-600 font-semibold">
          Your Wishlist
        </h2>
        {wishArr.length <= 0 ? (
          <>
            <div className=" mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-2">
              <h2>Your wishlist is empty.</h2>
              <Link to="/" className="text-primary-900 mt-2  ">
                Start shopping
              </Link>
            </div>
          </>
        ) : wishProducts ? (
          <>
            <div className="space-y-4 mt-6">
              {wishProducts.map((product) => (
                <WishItem key={product._id} productInfo={product} />
              ))}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
