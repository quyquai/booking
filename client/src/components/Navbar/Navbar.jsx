import { Link, useNavigate } from 'react-router-dom';

import classes from './Navbar.module.css';
import { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className={classes.navbar}>
      <div className={classes['navbar-container']}>
        <span className={classes.logo}>
          <Link to="/">Booking</Link>
        </span>
        {!user && (
          <div>
            <button
              className={classes['navbar-button']}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button
              className={classes['navbar-button']}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        )}
        {user && (
          <div>
            <span className={classes.logo}>{user.username}</span>
            <button
              className={classes['navbar-button']}
              onClick={() => navigate('/transactions')}
            >
              Transaction
            </button>
            <button
              className={classes['navbar-button']}
              onClick={() => navigate('/logout')}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
