import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Products() { 
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
        <title>Products</title>
      </Helmet>
      <div className="mt-5 mb-10">
        <input
          type="text"
          className="form-control w-full"
          placeholder="Search ..."
          name="product"
        />
      </div>
      <div className="grid grid-cols-8 gap-5"> 
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} /> 
        ))}
      </div>
    </>
  );
}
