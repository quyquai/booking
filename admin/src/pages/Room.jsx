import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Room.module.css';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  async function fetchRoom() {
    try {
      const response = await fetch('http://localhost:5000/admin/rooms');
      const result = await response.json();
      setRooms(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  const AddRoomHandler = () => {
    navigate('/rooms/add-new');
  };
  return (
    <div className={classes['room-container']}>
      <div className={classes['room-list']}>
        <h2 className={classes['room-list-title']}>Rooms List</h2>
        <div>
          <button className={classes['add-new']} onClick={AddRoomHandler}>
            Add New
          </button>
        </div>
      </div>
      <div className={classes['room-table']}>
        <table>
          <thead className={classes['room-table-header']}>
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
                <p>Title</p>
              </th>
              <th>
                <p>Description</p>
              </th>
              <th>
                <p>Price</p>
              </th>
              <th>
                <p>Max People</p>
              </th>
              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>
                  <span>
                    <input type="checkbox" />
                  </span>
                </td>
                <td>
                  <span>{room._id}</span>
                </td>
                <td>
                  <span>{room.title}</span>
                </td>
                <td>
                  <span>{room.desc}</span>
                </td>
                <td>
                  <span>{room.price}</span>
                </td>
                <td>
                  <span>{room.maxPeople}</span>
                </td>
                <td>
                  <button className={classes.btn}>Delete</button>
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
