// App.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "./components/PasswordForm";
import PasswordList from "./components/PasswordList";
import { RiAddCircleLine } from "react-icons/ri";
import axios from "axios";

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPassword, setEditPassword] = useState(null);

  const BaseUrl = "http://localhost:3000";

  useEffect(() => {
    fetchPasswords();
  }, [editPassword]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(BaseUrl + "/api/passwords");
      setPasswords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPassword = async (password) => {
    try {
      if (editPassword) {
        await axios.put(
          BaseUrl + `/api/passwords/${editPassword._id}`,
          password
        );
        setEditPassword(null);
      } else {
        const response = await axios.post(BaseUrl + "/api/passwords", password);
        setPasswords((prevPasswords) => [...prevPasswords, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(BaseUrl + `/api/passwords/${id}`);
      setPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password._id !== id)
      );
    } catch (error) {
      console.error(error);
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

  return (
    <div className="container mx-auto p-2">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-center font-bold text-3xl">Password Manager</h1>
        <button
          onClick={openModal}
          className="flex items- text-gray-800 p-2 rounded-full focus:outline-none"
        >
          <RiAddCircleLine className="mr-1 text-4xl" />
        </button>
      </nav>
      <PasswordList
        passwords={passwords}
        deletePassword={deletePassword}
        openEditModal={openEditModal}
      />
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

export default App;
