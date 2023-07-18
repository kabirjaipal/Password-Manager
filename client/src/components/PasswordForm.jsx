import React, { useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";

const PasswordForm = ({ addPassword, closeModal, editPassword }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editPassword) {
      setUsername(editPassword.username);
      setPassword(editPassword.password);
    }
  }, [editPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      addPassword({ username, password });
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">
          {editPassword ? "Edit Password" : "Add Password"}
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-lg font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-lg font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 focus:outline-none"
            >
              {editPassword ? <>Update</> : <>Add</>}
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
