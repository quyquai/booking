import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import classes from './Home.module.css';

export default function HomePage() {
  return (
    <main>
      <div className={classes['container-admin']}>
        <h3>Admin Page</h3>
      </div>
      <div className={classes['container-home']}>
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
}
