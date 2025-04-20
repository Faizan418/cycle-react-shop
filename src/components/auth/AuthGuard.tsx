
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUsersFromStorage } from '@/utils/authUtils';
import { toast } from "sonner";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    const users = getUsersFromStorage();

    if (currentUser) {
      // User is logged in, allow access to all routes
      return;
    } else if (users.length === 0) {
      // No users exist, redirect to register
      toast.info("Please register to continue");
      navigate('/account?tab=register');
    } else {
      // Users exist but not logged in, redirect to login
      toast.info("Please login to continue");
      navigate('/account?tab=login');
    }
  }, [navigate]);

  return <>{children}</>;
};
