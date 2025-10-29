"use client";

import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  token: string; // backend JWT
  streamToken?: string; // Stream token from backend
  preferences?: {
    gender?: string;
    ageRange?: { min: number; max: number };
  };
} | null;

type AuthContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void; // ✅ new
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const login = (userData: User) => {
    setUser(userData);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ New function: update only part of user data (like preferences)
  const updateUser = (updatedData: Partial<User>) => {
    setUser((prev) => {
      const newUser = prev ? { ...prev, ...updatedData } : null;
      if (newUser) localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
