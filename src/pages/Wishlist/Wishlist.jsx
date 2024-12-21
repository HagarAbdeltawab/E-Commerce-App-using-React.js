import { Helmet } from "react-helmet";
import { WishlistContext } from "../../context/wishlist.context.jsx";
import { useContext, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";
import WishItem from "../../components/WishItem/WishItem.jsx";

export default function Wishlist() {
  const { getWishlistProducts, wishProducts } = useContext(WishlistContext);

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
        {wishProducts ? (
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
