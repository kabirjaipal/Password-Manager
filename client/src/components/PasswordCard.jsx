import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsClipboard, BsPencilSquare, BsTrash } from "react-icons/bs";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const PasswordCard = ({ password, deletePassword, openEditModal }) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div
      key={password._id}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointeroverflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-xl">{password.username}</span>
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
      <div className="flex items-center justify-between overflow-hidden gap-2">
        <span className="text-gray-600 whitespace-nowrap overflow-ellipsis overflow-hidden">
          <strong>Password:</strong>{" "}
          {showPassword
            ? password.password
            : password.password.replace(/./g, "*")}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyPassword(password.password)}
            className="text-gray-600 hover:text-green-500 focus:outline-none"
          >
            {copied ? <AiFillCheckCircle /> : <BsClipboard />}
          </button>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600 hover:text-green-500 focus:outline-none"
          >
            {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
