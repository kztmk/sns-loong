import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import { useAppSelector } from '../../hooks/rtkHooks';
// types
import { GuardProps } from '../../types/auth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('login', {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

export default AuthGuard;
