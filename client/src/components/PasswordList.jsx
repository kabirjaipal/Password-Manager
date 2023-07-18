// PasswordList.jsx
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash, BsClipboard } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

const PasswordList = ({ passwords, deletePassword, openEditModal }) => {
  const [copied, setCopied] = useState(false);

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }, [copied]);

  return (
    <div className="flex flex-col items-center w-full">
      {passwords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
          {passwords.map((password) => (
            <div
              key={password._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer w-[300px]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-xl">
                  {password.username}
                </span>
                <div>
                  <button
                    onClick={() => openEditModal(password)}
                    className="text-gray-600 hover:text-blue-500 focus:outline-none"
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    onClick={() => deletePassword(password._id)}
                    className="text-gray-600 hover:text-red-500 focus:outline-none ml-2"
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  <strong>Password:</strong>{" "}
                  {password.password.replace(/./g, "*")}
                </span>
                <button
                  onClick={() => copyPassword(password.password)}
                  className="text-gray-600 hover:text-green-500 focus:outline-none"
                >
                  {copied ? <AiFillCheckCircle /> : <BsClipboard />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-2xl font-semibold text-center mt-20 capitalize">
          No passwords found
        </p>
      )}
    </div>
  );
};

export default PasswordList;
