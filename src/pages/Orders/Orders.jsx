import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context.jsx";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading.jsx";
import { Link } from "react-router-dom";

export default function Orders() {
  const { token } = useContext(UserContext);

  const { id } = jwtDecode(token);

  const [orders, setOrders] = useState(null);

  async function getUserOrders() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      };
      const { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      {orders ? (
        <section className="space-y-4">
          {orders.map((order) => (
            <>
              <div
                key={order.id}
                className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg"
              >
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-500">Order ID</h2>
                    <span className="text-lg font-semibold text-gray-700">
                      #{order.id}
                    </span>
                  </div>
                  <div>
                    {order.isPaid ? (
                      <span className="font-cairo inline-block px-3 py-1 mx-2 bg-red-500 text-white rounded-full">
                        تم الدفع
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 mx-2 bg-red-500 text-white rounded-full">
                        غير مدفوع
                      </span>
                    )}

                    {order.isDelivered ? (
                      <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white rounded-full">
                        تم الإستلام
                      </span>
                    ) : (
                      <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white rounded-full">
                        قيد التوصيل
                      </span>
                    )}
                  </div>
                </header>

                <div className="mt-4 grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {order.cartItems.map((item) => (
                    <div
                      key={item.product._id}
                      className="product-item overflow-hidden border-2 border-gray-400 border-opacity-30 rounded-lg"
                    >
                      <img
                        src={item.product.imageCover}
                        className="w-full"
                        alt=""
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold line-clamp-1">
                          <Link to={`/product/${item.product._id}`}>
                            {item.product.title}
                          </Link>
                        </h3>
                        <div className="mt-2 flex justify-between items-center">
                          <p>
                            <span className="font-bold mr-1">Count:</span>{" "}
                            {item.count}
                          </p>
                          <span>{item.price} L.E</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p>
                    Your Orders Price is{" "}
                    <span className="mx-1 font-bold text-primary-700">
                      {order.totalOrderPrice}
                    </span>{" "}
                    L.E
                  </p>
                </div>
              </div>
            </>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
