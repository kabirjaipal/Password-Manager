import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    if (Object.values(data).some((value) => !value)) {
      return alert("Please fill all the fields");
    }
    setLoading(true);
    console.log({ data });
    axios
      .post(baseUrl + "/api/auth/login", data)
      .then((res) => res.data)
      .then((res) => {
        console.log({ res });
        localStorage.setItem("token", res.token);
        setToken(res.token);
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
      <h1 className="text-4xl font-bold">Login</h1>
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
        <button
          type="submit"
          className={`rounded border ${
            loading ? "bg-gray-700" : "bg-black"
          } p-2 text-white hover:opacity-70 transition-opacity`}
        >
          {loading ? "Submitting..." : "Login"}
        </button>
        <button
          type="submit"
          className="rounded border p-2 text-black hover:bg-gray-200 transition-colors"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
