// PasswordList.jsx
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash, BsClipboard } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import PasswordCard from "./PasswordCard";

const PasswordList = ({ passwords, deletePassword, openEditModal }) => {
  return (
    <div className="w-full">
      {passwords.length > 0 ? (
        <div className="grid grid-auto-fit gap-4">
          {passwords.map((password) => (
            <PasswordCard
              password={password}
              key={password._id}
              deletePassword={deletePassword}
              openEditModal={openEditModal}
            />
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
