import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    const { data } = await axios.request(options);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <section className="py-8">
          <h2 className="font-semibold text-lg mb-3">
            Shop Popular Categories
          </h2>
          {
            <swiper-container loop={true} slides-per-view={5}>
              {categories.map((category) => (
                <swiper-slide key={category._id}>
                  <Link to={`/category/${category._id}`}>
                    <img
                      src={category.image}
                      alt=""
                      className="w-full h-72 object-cover"
                    />
                    <h3>{category.name}</h3>
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          }
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
