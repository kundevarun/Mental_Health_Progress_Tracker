import React, { createContext, useState, useEffect } from 'react';
import { Client, Account } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67b8f1240016a05629d0');
const account = new Account(client);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error("User not logged in");
      }
    };
    checkUser();
  }, []);

  const login = async () => {
    try {
      const result = await account.createOAuth2Session('google', 'http://localhost:3000/');
      setUser(result);
  
      localStorage.setItem('token', result.$id); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  const logout = async () => {
    try {
      await account.deleteSession('current'); 
      setUser(null);
  
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
