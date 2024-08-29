import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { MdOutlinePaid } from 'react-icons/md';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { useEffect, useState } from 'react';
import classes from './InfoBoard.module.css';

export default function InfoBoard() {
  const [info, setInfo] = useState({});
  async function fetchTransaction() {
    try {
      const response = await fetch('http://localhost:5000/admin/info');
      const result = await response.json();
      setInfo(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <>
      <div className={classes['info-board']}>
        <div className={classes['info-item']}>
          <p className={classes['info-title']}>Users</p>
          <p className={classes['info-value']}>{info.userCount}</p>
          <PersonOutlineIcon
            className={`${classes.icons} ${classes['icon-user']}`}
          />
        </div>
        <div className={classes['info-item']}>
          <p className={classes['info-title']}>Orders</p>
          <p className={classes['info-value']}>{info.transactionCount}</p>
          <ShoppingCartOutlinedIcon
            className={`${classes.icons} ${classes['icon-order']}`}
          />
        </div>
        <div className={classes['info-item']}>
          <p className={classes['info-title']}>Earnings</p>
          <p className={classes['info-value']}>{info.totalRevenue}</p>
          <MdOutlinePaid
            className={`${classes.icons} ${classes['icon-paid']}`}
          />
        </div>
        <div className={classes['info-item']}>
          <p className={classes['info-title']}>Balance</p>
          <p className={classes['info-value']}>{info.averageMonthlyRevenue}</p>
          <MdOutlineAccountBalanceWallet
            className={`${classes.icons} ${classes['icon-balance']}`}
          />
        </div>
      </div>
    </>
  );
}
