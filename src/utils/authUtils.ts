
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

export const updateUserProfile = (userData: Partial<User>): boolean => {
  try {
    // Get current user
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) return false;
    
    const currentUser = JSON.parse(currentUserData) as User;
    const email = currentUser.email;
    
    // Get all users and find the current user
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) return false;
    
    // Update user data (except email which is used as identifier)
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    
    // Save updated users list and current user
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Dispatch event to notify profile update
    window.dispatchEvent(new Event('userProfileUpdated'));
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
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
