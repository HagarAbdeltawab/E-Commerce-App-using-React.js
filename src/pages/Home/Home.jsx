import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import { Helmet } from "react-helmet";

export default function Home() {
  // * state for products
  const [products, setProducts] = useState(null);
  // * function to get products from db
  const getProducts = async () => {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/products",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="FreshCart" />
      </Helmet>

      <HomeSlider />

      <CategorySlider />

      {products ? (
        <div className="grid grid-cols-12 gap-4">
          {products.map((product) => (
            <ProductCard productInfo={product} key={product._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
