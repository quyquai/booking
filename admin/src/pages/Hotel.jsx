import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classes from './Hotel.module.css';
import ModelConfirm from '../Model/ModelComfirm';

export default function Hotel() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  // console.log(hotelId);

  async function fetchHotel() {
    try {
      const response = await fetch('http://localhost:5000/admin/hotels');
      const result = await response.json();

      setHotels(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHotel();
  }, [hotels]);

  const AddNewHotelHandler = () => {
    navigate('/hotels/add-new');
  };

  async function fetchDelete() {
    // const id = ;
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelId }),
      };
      // fetch('http://localhost:5000/admin/delete-hotel', requestOptions);
      const response = await fetch('http://localhost:5000/admin/delete-hotel', requestOptions);
      const result = await response.json();
      if (response.status === 405) {
        alert(result.message);
      }
      if (response.status === 200) {
        alert(result.message);
        console.log(result);
      }
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const confirmDelete = () => {
    fetchDelete();

    setShow(false);
  };

  const handleDeleteHotel = (id) => {
    setHotelId(id);
    setShow(true);
  };

  return (
    <div className={classes['hotel-container']}>
      <ModelConfirm show={show} close={handleClose} handleDelete={confirmDelete} />
      <div className={classes['hotel-list']}>
        <h2 className={classes['hotel-list-title']}>Hotels List</h2>
        <div>
          <button className={classes['add-new']} onClick={AddNewHotelHandler}>
            Add New
          </button>
        </div>
      </div>
      <div className={classes['hotel-table']}>
        <table>
          <thead className={classes['hotel-table-header']}>
            <tr className={classes['hotel-table-header-row']}>
              <th>
                <p>
                  <input type="checkbox" />
                </p>
              </th>
              <th>
                <p>ID</p>
              </th>
              <th>
                <p>Name</p>
              </th>
              <th>
                <p>Type</p>
              </th>
              <th>
                <p>Title</p>
              </th>
              <th>
                <p>City</p>
              </th>
              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>
                  <span>
                    <input type="checkbox" />
                  </span>
                </td>
                <td>
                  <span>{hotel._id}</span>
                </td>
                <td>
                  <span>{hotel.name}</span>
                </td>
                <td>
                  <span>{hotel.type}</span>
                </td>
                <td>
                  <span>{hotel.title}</span>
                </td>
                <td>
                  <span>{hotel.city}</span>
                </td>
                <td>
                  <button className={classes.btn} onClick={() => handleDeleteHotel(hotel._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9" className={classes['table-footer']}>
                1-9 of 9
                <FontAwesomeIcon className={classes['icon-left']} icon={faChevronLeft} />
                <FontAwesomeIcon className={classes['icon-right']} icon={faChevronRight} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
