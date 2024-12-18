import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import HomeSlider from "../../components/HomeSlider/HomeSlider.jsx";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // * function to get products from db
  const getProducts = () => {
    const options = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/products",
    };
    return axios.request(options);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
      <Helmet>
        <title>Home</title>
        <meta name="description" content="FreshCart" />
      </Helmet>
      <HomeSlider />
      <CategorySlider />
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
