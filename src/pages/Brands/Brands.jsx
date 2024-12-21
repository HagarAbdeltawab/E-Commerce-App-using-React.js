import axios from "axios";
import { Helmet } from "react-helmet";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { useEffect, useState } from "react";
import BrandCard from "../../components/BrandCard/BrandCard.jsx";

export default function Brands() {
  const [brands, setBrands] = useState(null);

  const getBrands = async () => {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/brands",
    };
    const { data } = await axios.request(options);
    console.log(data.data);
    setBrands(data.data);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>brands</title>
      </Helmet>

      {brands ? (
        <div className="grid grid-cols-12 gap-5">
          {brands.map((brand) => (
            <BrandCard brandInfo={brand} key={brand._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
