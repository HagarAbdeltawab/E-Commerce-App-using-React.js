import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context.jsx";
import ReactImageGallery from "react-image-gallery";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const { id } = useParams();

  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      };
      const { data } = await axios.request(options);
      setProduct(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`,
      };
      const { data } = await axios.request(options);
      setRelatedProducts(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (product === null) return;
    getRelatedProducts();
  }, [product]);

  return (
    <>
      {product ? (
        <>
          <section className=" grid grid-cols-12 gap-12">
            <div className="col-span-3">
              <ReactImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                items={product.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="col-span-9 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {product.title}
                </h2>
                <h3 className="text-primary-600 font-semibold">
                  {product.category.name}
                </h3>
              </div>
              <p className="text-gray-400">{product.description}</p>
              <div className="flex items-center justify-between">
                <span>{product.price} EGP</span>
                <div>
                  <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="btn bg-primary-500 hover:bg-primary-600 text-white font-semibold w-full"
              >
                Add To Cart
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-gray-600 my-8">Related Products </h2>
            {relatedProducts ? (
              <Swiper slidesPerView={5} spaceBetween={15}>
                {relatedProducts.map((prod) => (
                  <SwiperSlide key={prod.id}>
                    <ProductCard productInfo={prod} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
