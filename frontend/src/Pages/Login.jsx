import React from 'react'
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values) => {
      setIsLoading(true);
      const data = {
        phoneNumber: values.phoneNumber,
        password: values.password,
      };

      console.log(data);
      const uri = "https://airtime-purchaser.onrender.com/users/login";
      axios
        .post(uri, data)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          localStorage.setItem("phoneNumber", values.phoneNumber);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const phoneValidate = /^\d{11}$/;
    const navigate = useNavigate();
    const { handleSubmit, handleChange, errors, touched, handleBlur, values } =
      useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: "",
        },
        validationSchema: yup.object().shape({
          phoneNumber: yup
            .string()
            .matches(phoneValidate, "Must be a valid phone number")
            .required("Phone number field is required"),
          password: yup
            .string()
            .required("Password field cannot be empty")
            .min(6, "Password cannot be less than 6 characters"),
        }),
        onSubmit,
      });
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-10 bg-opacity-75 backdrop-filter backdrop-blur-sm">
          <div className="flex items-center justify-center h-screen">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex justify-content-center container  my-36">
        <form onSubmit={handleSubmit} className="shadow-lg p-3 w-96 rounded-xl">
          <div className="form-group mt-3">
            <input
              name="phoneNumber"
              className="w-full  p-2 border  "
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone Number"
              type="text"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <small className="text-danger fw-bold">
                {errors.phoneNumber}
              </small>
            )}
          </div>
          <div className="form-group mt-3">
            <input
              name="password"
              className="w-full  p-2 border  "
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              type="password"
            />
            {touched.password && errors.password && (
              <small className="text-danger fw-bold">{errors.password}</small>
            )}
          </div>
          <button
            type="submit"
            className="text-white p-2 px-3 rounded-lg bg-blue-500 mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login