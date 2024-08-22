import { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Session check failed:", error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
    } catch (error) {
      throw new Error(error.response.data.message || "Login failed");
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response.data.message || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post("/api/users/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(null);
      localStorage.removeItem('token'); // Clear the token from localStorage
      localStorage.removeItem('userId'); // Clear the userId from localStorage if you're storing it
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if the server request fails, we should still clear the local state
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
