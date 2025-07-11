import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./auth.context";
import { useNavigate } from "react-router";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("auth__token");
    if (localToken) setToken(localToken);
  }, []);

  function login(token) {
    setToken(token);
    localStorage.setItem("auth__token", token);
    navigate("/tours");
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("auth__token");
    navigate("/login");
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
