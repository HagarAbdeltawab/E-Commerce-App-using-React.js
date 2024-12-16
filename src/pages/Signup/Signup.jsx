import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
// import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Signup() {
  // *regex pattern
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  // *validation schema using Yup
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name can't be more than 30 characters"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Passwords must match"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Must be egyptian phone number"),
  });
  // state for account exits
  // const [accountExists, setAccountExists] = useState(null);
  // *navigate to login page
  const navigate = useNavigate();
  // *send data to db function
  async function sendDataToRegister(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.dismiss(loadingId);
        toast.success("Account created successfully");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (error) {
      // setAccountExists(error.response.data.message);
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <h1 className="test-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i> Register Now
      </h1>

      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            className="form-control w-full"
            type="text"
            placeholder="Your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />

          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 mt-1 text-sm">{formik.errors.name}</p>
          )}
        </div>

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

          {/* {accountExists && (
            <p className="text-red-500 mt-1 text-sm">{accountExists}</p>
          )} */}
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

        <div className="rePassword">
          <input
            className="form-control w-full"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />

          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 mt-1 text-sm">
              {formik.errors.rePassword}
            </p>
          )}
        </div>

        <div className="phone">
          <input
            className="form-control w-full"
            type="tel"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />

          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 mt-1 text-sm">{formik.errors.phone}</p>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Sign Up
        </button>
      </form>
    </>
  );
}
