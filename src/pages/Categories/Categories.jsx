import axios from "axios";
import { Helmet } from "react-helmet";
import CategoryCard from "../../components/CategoryCard/CategoryCard.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  const getCategories = async () => {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    const { data } = await axios.request(options);
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>categories</title>
      </Helmet>

      {categories ? (
        <div className="grid grid-cols-12 gap-8">
          {categories.map((category) => (
            <CategoryCard categoryInfo={category} key={category._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
