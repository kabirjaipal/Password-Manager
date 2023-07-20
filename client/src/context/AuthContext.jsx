import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = !!token;
  const signOut = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const value = {
    token,
    setToken,
    isAuthenticated,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
