import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    navigate('/login');
  }, [setUser, navigate]);
}
