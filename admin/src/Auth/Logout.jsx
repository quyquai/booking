import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth(AuthProvider);
  useEffect(() => {
    logout();
    navigate('/login');
  }, []);
}
