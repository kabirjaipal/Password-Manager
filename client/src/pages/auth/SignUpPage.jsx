import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    if (Object.values(data).some((value) => !value)) {
      return alert("Please fill all the fields");
    }
    if (data.password !== data.confirm_password) {
      return alert("Passwords do not match");
    }
    setLoading(true);
    console.log({ data });
    axios
      .post(baseUrl + "/api/auth/register", data)
      .then((res) => res.data)
      .then((res) => {
        alert(res.message);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center flex-col min-h-screen items-center gap-4 mx-4">
      <h1 className="text-4xl font-bold">Signup</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:max-w-md max-w-xs w-full"
      >
        <label htmlFor="username" className="block">
          <p className="mb-2">Username</p>
          <input
            type="text"
            id="username"
            name="username"
            className="border outline-none p-2 rounded w-full"
          />
        </label>
        <label htmlFor="password" className="block">
          <p className="mb-2">Password</p>
          <input
            type="password"
            id="password"
            name="password"
            className="border outline-none p-2 rounded w-full"
          />
        </label>
        <label htmlFor="confirm_password" className="block">
          <p className="mb-2">Confirm password</p>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="border outline-none p-2 rounded w-full"
          />
        </label>
        <button
          type="submit"
          className={`rounded border ${
            loading ? "bg-gray-700" : "bg-black"
          } p-2 text-white hover:opacity-70 transition-opacity`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Signup"}
        </button>
        <button
          type="submit"
          className="rounded border p-2 text-black hover:bg-gray-200 transition-colors"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
