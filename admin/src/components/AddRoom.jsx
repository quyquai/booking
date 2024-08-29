import { useEffect, useState } from 'react';
import classes from './AddRoom.module.css';
import { isNotEmpty } from '../utils/validation';

export default function AddRoom() {
  const [title, setTitle] = useState('');
  const [price, setPice] = useState('');
  const [desc, setDesc] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [rooms, setRooms] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [hotels, setHotels] = useState([]);

  const [err, setErr] = useState('');

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
  }, []);

  const addRoomHandler = (e) => {
    e.preventDefault();
    if (!isNotEmpty(title)) {
      setErr('Please enter the title field');
      return;
    }
    if (!isNotEmpty(price)) {
      setErr('Please enter the price field');
      return;
    }
    if (!isNotEmpty(desc)) {
      setErr('Please enter the description field');
      return;
    }
    if (!isNotEmpty(maxPeople)) {
      setErr('Please enter the max people field');
      return;
    }
    if (!isNotEmpty(rooms)) {
      setErr('Please enter the rooms field');
      return;
    }
    if (!isNotEmpty(hotelId)) {
      setErr('Please enter the hotel field');
      return;
    }

    const roomData = {
      title,
      price,
      desc,
      maxPeople,
      rooms,
      hotelId,
    };

    async function fetchPostRoom() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roomData),
          redirect: 'follow',
        };
        const response = await fetch('http://localhost:5000/admin/add-room', requestOptions);
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostRoom();
  };

  return (
    <div className={classes['add-room-container']}>
      <div className={classes['add-room-header']}>Add New Room</div>
      <form onSubmit={addRoomHandler}>
        {err && <p className={classes.err}>{err}</p>}
        <div className={classes['add-room-form']}>
          <div className={classes['form-section']}>
            <div className={classes['form-group']}>
              <label htmlFor="title" className={classes['form-label']}>
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="2 bed room"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="price" className={classes['form-label']}>
                Price
              </label>
              <input
                value={price}
                onChange={(e) => setPice(e.target.value)}
                type="text"
                name="price"
                placeholder="100"
                className={classes['form-input']}
              />
            </div>
          </div>
          <div className={classes['form-section']}>
            <div className={classes['form-group']}>
              <label htmlFor="desc" className={classes['form-label']}>
                Description
              </label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                name="desc"
                placeholder="King size bed"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="maxPeople" className={classes['form-label']}>
                Max People
              </label>
              <input
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
                type="text"
                name="maxPeople"
                placeholder="2"
                className={classes['form-input']}
              />
            </div>
          </div>
        </div>

        <div className={classes['form-room']}>
          <div>
            <label htmlFor="rooms" className={classes['form-label']}>
              Rooms
            </label>
            <textarea
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              name="rooms"
              id="rooms"
              rows={2}
              className={classes['form-textarea']}
            ></textarea>
          </div>
          <div>
            <label htmlFor="hotel" className={classes['form-label']}>
              Choose a hotel
            </label>
            <select value={hotelId} onChange={(e) => setHotelId(e.target.value)} name="hotel" id="hotel">
              <option value="">Select Hotel</option>
              {hotels &&
                hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={classes.action}>
            <button type="submit" className={classes['form-button']}>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
