import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../context/User.context.jsx";
import { Helmet } from "react-helmet";

export default function Login() {
  // *regex pattern
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  // *validation schema using Yup
  const validationSchema = object({
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  // *navigate to home page
  const navigate = useNavigate();
  // * token state
  const { setToken } = useContext(UserContext);
  // *send data to db function
  async function sendDataToLogin(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.dismiss(loadingId);
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
      // * reset form
      formik.resetForm();
    }
  }
  // *get data from form and send it to db using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1 className="test-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i> Login
      </h1>

      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="email">
          <input
            className="form-control w-full"
            type="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />

          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-1 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="password">
          <input
            className="form-control w-full"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />

          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-1 text-sm">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Login
        </button>
      </form>
    </>
  );
}
