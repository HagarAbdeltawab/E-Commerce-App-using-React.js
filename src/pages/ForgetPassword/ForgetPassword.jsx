import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const validationSchema = object({
    email: string().email("Invalid email").required("Email is required"),
  });
  const navigate = useNavigate();

  async function forgetPassword(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.statusMsg === "success") {
        toast.success(data.message);
        toast.dismiss(loadingId);
        setTimeout(() => {
          navigate("/verify-code");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="test-xl text-slate-700 font-semibold mb-5">
        please enter your verification code
      </h1>
      <form className="space-y-5 mt-5" onSubmit={formik.handleSubmit}>
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

        <button type="submit" className="btn w-full">
          Verify
        </button>
      </form>
    </>
  );
}
