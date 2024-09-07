import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { Host } from "../../Components/host"; // Use your host URL

const AuthState = (props) => {
  const host = process.env.HOST;
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login User
  const login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setAuthToken(json.authToken);
      setIsAuthenticated(true);
      await getUserDetails();
    } else {
      console.error("Failed to login:", json.error);
    }
  };

  // Register User
  const register = async (fname, lname, email, password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ fname, lname, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setAuthToken(json.authToken);
      setIsAuthenticated(true);
      await getUserDetails();
    } else {
      console.error("Failed to register:", json.error);
    }
  };

  // Logout User
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get User Details
  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      credentials: 'include',
    });
    const userData = await response.json();
    setUser(userData);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (authToken) {
      getUserDetails();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ user, authToken, isAuthenticated, login, register, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
