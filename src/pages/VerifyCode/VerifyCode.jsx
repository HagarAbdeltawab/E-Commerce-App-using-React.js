import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });
  const navigate = useNavigate();

  async function forgetPassword(values) {
    const loadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);

      if (data.status === "Success") {
        toast.dismiss(loadingId);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <h1 className="test-xl text-slate-700 font-semibold mb-5">
        reset your account password
      </h1>
      <form className="space-y-5 mt-5" onSubmit={formik.handleSubmit}>
        <div className="code">
          <input
            className="form-control w-full"
            type="text"
            placeholder="Code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="resetCode"
          />

          {formik.errors.resetCode && formik.touched.resetCode && (
            <p className="text-red-500 mt-1 text-sm">
              {formik.errors.resetCode}
            </p>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Verify
        </button>
      </form>
    </>
  );
}
