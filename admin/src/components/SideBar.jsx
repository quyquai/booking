import { HiOutlineUser } from 'react-icons/hi';
import { MdStore } from 'react-icons/md';
import { IoBedOutline } from 'react-icons/io5';
import { FaTruck } from 'react-icons/fa';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Link } from 'react-router-dom';

import classes from './SideBar.module.css';

export default function SideBar() {
  return (
    <div className={classes['sidebar-wrapper']}>
      <p>MAIN</p>
      <ul>
        <li className={classes['main-list']}>
          <Link to="/">
            <i className={`material-icons ${classes.icon}`}>dashboard</i>
            <span>DashBoard</span>
          </Link>
        </li>
      </ul>

      <p>LISTS</p>
      <ul>
        <li>
          <Link to="/users">
            <HiOutlineUser className={classes.icon} />
            Users
          </Link>
        </li>
        <li>
          <Link to="/hotels">
            <MdStore className={classes.icon} />
            Hotels
          </Link>
        </li>
        <li>
          <Link to="/rooms">
            <IoBedOutline className={classes.icon} />
            Rooms
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <FaTruck className={classes.icon} />
            Transactions
          </Link>
        </li>
      </ul>

      <p>NEW</p>
      <ul>
        <li>
          <Link to="/hotels/add-new">
            <MdStore className={classes.icon} />
            New Hotel
          </Link>
        </li>
        <li>
          <Link to="/rooms/add-new">
            <IoBedOutline className={classes.icon} />
            New Room
          </Link>
        </li>
      </ul>

      <p>USER</p>
      <ul>
        <li>
          <Link to="/logout">
            <ExitToAppIcon className={classes.icon} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
