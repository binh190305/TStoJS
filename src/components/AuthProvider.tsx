import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'customer' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUsers = {
      'admin@billard.com': { id: '1', name: 'Admin User', email: 'admin@billard.com', role: 'admin' as UserRole },
      'customer@billard.com': { id: '2', name: 'Club Owner', email: 'customer@billard.com', role: 'customer' as UserRole },
      'staff@billard.com': { id: '3', name: 'Staff Member', email: 'staff@billard.com', role: 'staff' as UserRole }
    };

    const foundUser = mockUsers[email as keyof typeof mockUsers];
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const loginWithGoogle = async () => {
    // Mock Google authentication - in real app, this would integrate with Google OAuth
    // Simulating Google sign-in flow
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockGoogleUser = {
          id: 'google_' + Math.random().toString(36).substr(2, 9),
          name: 'Google User',
          email: 'user@gmail.com',
          role: 'customer' as UserRole, // Default role for Google sign-in users
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        };
        setUser(mockGoogleUser);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}