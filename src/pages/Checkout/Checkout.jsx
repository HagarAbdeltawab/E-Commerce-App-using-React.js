import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context.jsx";
import { UserContext } from "../../context/User.context.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartProducts } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  //* cash order
  async function createCashOrder(values) {
    const toastId = toast.loading("we are creating your order ...");
    try {
      const options = {
        method: "POST",
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.cartId}`,
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);

      if (data.status === "success") {
        toast.success("Order created successfully");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  //* online payment
  async function handelOnlineOrder(values) {
    try {
      const options = {
        method: "POST",
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.cartId}?url=${location.origin}`,
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status == "success") {
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      paymentMethod === "cash"
        ? createCashOrder(values)
        : handelOnlineOrder(values);
    },
  });

  return (
    <>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-4">
          Shipping Address
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="form-control w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
            />
          </div>

          <div className="phone">
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              name="shippingAddress.phone"
            />
          </div>

          <div className="details">
            <textarea
              className="form-control w-full"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            ></textarea>
          </div>

          <button
            onClick={() => {
              setPaymentMethod("cash");
            }}
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-2"
          >
            Cash Order
          </button>
          <button
            onClick={() => {
              setPaymentMethod("online");
            }}
            type="submit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white font-semibold"
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
