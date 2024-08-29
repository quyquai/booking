import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import classes from './Transaction.module.css';

export default function LatestTransaction({ home }) {
  const [transactions, setTransactions] = useState([]);

  async function fetchTransaction() {
    try {
      const response = await fetch('http://localhost:5000/admin/transactions');
      const result = await response.json();
      setTransactions(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div className={classes['latest-transactions']}>
      <div className={classes['transactions-header']}>
        <h2>{home === 'home' ? 'Latest Transactions' : 'Transactions List'}</h2>
        <div className={classes['transactions-table']}>
          <table>
            <thead>
              <tr>
                <th>
                  <p>
                    <input type="checkbox" />
                  </p>
                </th>
                <th>
                  <p>ID</p>
                </th>
                <th>
                  <p>User</p>
                </th>
                <th>
                  <p>Hotel</p>
                </th>
                <th>
                  <p>Room</p>
                </th>
                <th>
                  <p>Date</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th>
                  <p>Payment Method</p>
                </th>
                <th>
                  <p>Status</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <span>
                      <input type="checkbox" />
                    </span>
                  </td>
                  <td>
                    <span>{transaction._id}</span>
                  </td>
                  <td>
                    <span>{transaction.user.fullName}</span>
                  </td>
                  <td>
                    <span>{transaction.hotel.title}</span>
                  </td>
                  <td>
                    <span>{transaction.room.map((roomNumber) => roomNumber).join(', ')}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(transaction.dateStart).toLocaleDateString()} -
                      {new Date(transaction.dateEnd).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    <span>${transaction.price}</span>
                  </td>
                  <td>
                    <span>{transaction.payment}</span>
                  </td>
                  <td>
                    <span>{transaction.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="9" className={classes['table-footer']}>
                  1-8 of 8
                  <FontAwesomeIcon className={classes['icon-left']} icon={faChevronLeft} />
                  <FontAwesomeIcon className={classes['icon-right']} icon={faChevronRight} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
