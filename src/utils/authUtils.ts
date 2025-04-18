
import { User } from "@/types/auth";

export const registerUser = (email: string, password: string): boolean => {
  try {
    const users = getUsersFromStorage();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return false;
    }
    
    // Add new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
};

export const loginUser = (email: string, password: string): boolean => {
  try {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.dispatchEvent(new Event('userLoggedIn'));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  window.dispatchEvent(new Event('userLoggedOut'));
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getUsersFromStorage = (): User[] => {
  try {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error("Error getting users from storage:", error);
    return [];
  }
};
