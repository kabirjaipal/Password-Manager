// App.jsx
import React, { useState, useEffect, useContext } from "react";
import { RiAddCircleLine, RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import PasswordList from "../components/PasswordList";
import PasswordForm from "../components/PasswordForm";
import apiInstance, { baseUrl } from "../config/api";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [passwords, setPasswords] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editPassword, setEditPassword] = useState(null);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await apiInstance.get(baseUrl + "/api/passwords");
      setPasswords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPassword = async (password) => {
    try {
      if (editPassword) {
        try {
          const res = await apiInstance.put(
            baseUrl + `/api/passwords/${editPassword._id}`,
            password
          );
          setEditPassword(null);
          alert(res.data.message);
          setPasswords((prevPasswords) => {
            const index = prevPasswords.findIndex(
              (password) => password._id === editPassword._id
            );
            const newPasswords = [...prevPasswords];
            newPasswords[index] = res.data.password;
            return newPasswords;
          });
        } catch (error) {
          alert(error.response.data.error);
        }
      } else {
        try {
          const response = await apiInstance.post(
            baseUrl + "/api/passwords",
            password
          );
          setPasswords((prevPasswords) => [...prevPasswords, response.data]);
          alert("Password added successfully");
        } catch (error) {
          alert(error.response.data.error);
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePassword = async (id) => {
    if (
      confirm("Are you sure you want to save this thing into the database?")
    ) {
      try {
        await apiInstance.delete(baseUrl + `/api/passwords/${id}`);
        setPasswords((prevPasswords) =>
          prevPasswords.filter((password) => password._id !== id)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = () => {
    setEditPassword(null);
    setShowModal(true);
  };

  const openEditModal = (password) => {
    setEditPassword(password);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const { signOut } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-2">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-center font-bold text-3xl">Password Manager</h1>
        <div className="flex items-center">
          <button
            onClick={openModal}
            className="flex items- text-gray-800 p-2 rounded-full focus:outline-none"
          >
            <RiAddCircleLine className="mr-1 text-4xl" />
          </button>
          <button
            onClick={signOut}
            className="flex items- text-gray-800 p-2 rounded-full focus:outline-none"
          >
            <RiLogoutBoxRLine className="mr-1 text-4xl" />
          </button>
        </div>
      </nav>
      {passwords ? (
        <PasswordList
          passwords={passwords}
          deletePassword={deletePassword}
          openEditModal={openEditModal}
        />
      ) : (
        <p>Loading...</p>
      )}
      {showModal && (
        <PasswordForm
          addPassword={addPassword}
          closeModal={closeModal}
          editPassword={editPassword}
        />
      )}
    </div>
  );
};

export default HomePage;
