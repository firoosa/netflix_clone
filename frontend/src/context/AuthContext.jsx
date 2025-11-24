import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const initAuth = async () => {
      try {
        if (authAPI.isAuthenticated()) {
          const user = authAPI.getCurrentUser();
          setCurrentUser(user);
          console.log("✅ User authenticated:", user);
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error);
        // Clear invalid tokens
        await authAPI.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      setCurrentUser(data.user);
      console.log("✅ Login successful:", data.user);
      return data;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  };

  const register = async (email, password, username = null) => {
    try {
      const data = await authAPI.register(email, password, username);
      setCurrentUser(data.user);
      console.log("✅ Registration successful:", data.user);
      return data;
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setCurrentUser(null);
      console.log("✅ Logged out");
    } catch (error) {
      console.error("❌ Logout error:", error.message);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

