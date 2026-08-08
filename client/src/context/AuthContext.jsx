import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user on app load
  const refreshUser = async () => {
    try {
      setLoading(true);

      const response = await authService.getMe();
        console.log("ME SUCCESS", response.data);
     setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (loginData) => {
    await authService.login(loginData);

    await refreshUser();
  };

  // Register
  const register = async (registerData) => {
    await authService.register(registerData);

    await refreshUser();
  };

  // Logout
  const logout = async () => {
    await authService.logout();

    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
