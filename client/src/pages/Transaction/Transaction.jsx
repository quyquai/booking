import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';

import classes from './Transaction.module.css';

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const fetchTransaction = async () => {
    try {
      if (!user) {
        return navigate('/login');
      }
      const response = await fetch(
        `http://localhost:5000/transactions/${user._id}`,
      );
      const result = await response.json();
      setTransactions(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div className={classes['transaction-container']}>
      <h2>Your Transactions</h2>
      {user && (
        <table className={classes['transaction-table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 &&
              transactions.map((item, index) => (
                <tr key={item._id}>
                  <td>{String(index + 1).padStart(2, '0')}</td>
                  <td>{item.hotel.title}</td>
                  <td>
                    {item.room.map((roomNumber) => roomNumber).join(', ')}
                  </td>
                  <td>
                    {new Date(item.dateStart).toLocaleDateString()} -
                    {new Date(item.dateEnd).toLocaleDateString()}
                  </td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
