import { createContext, useContext, useState, useEffect } from 'react'
import { mockApi } from '../lib/mockApi.js'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Start with true to check for existing auth

  // Check for existing authentication on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Check auth function - check localStorage for persisted user
  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check localStorage for saved user data
      const savedUser = localStorage.getItem('demo_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          console.log('Auth restored from localStorage:', parsedUser);
        } catch (e) {
          console.log('Invalid saved user data');
        }
      }
    } catch (error) {
      console.log('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await mockApi.login(credentials)
      console.log('Mock login response:', response)
      if (response && response.user) {
        setUser(response.user)
        return response
      }
    } catch (error) {
      console.error('Mock login error:', error)
      throw error
    }
  }

  const signup = async (credentials) => {
    try {
      const response = await mockApi.register(credentials)
      if (response && response.user) {
        setUser(response.user)
      }
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await mockApi.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      // Clear user state anyway
      setUser(null)
    }
  }

  const completeProfile = async (profileData) => {
    // Mock profile completion - just update user data
    try {
      const updatedUser = { ...user, ...profileData, profileCompleted: true }
      setUser(updatedUser)
      localStorage.setItem('demo_user', JSON.stringify(updatedUser))
      return { success: true, user: updatedUser }
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    completeProfile,
    checkAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext