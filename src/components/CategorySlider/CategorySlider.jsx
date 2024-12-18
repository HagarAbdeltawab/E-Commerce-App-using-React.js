import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  function getCategories() {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/categories",
    };
    return axios.request(options);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 9000,
    refetchOnMount: false,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 3,
    gcTime: 10000,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="py-8">
        <h2 className="font-semibold text-lg mb-3">Shop Popular Categories</h2>
        <swiper-container loop={true} slides-per-view={5}>
          {data.data.data.map((category) => (
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
      </section>
    </>
  );
}
