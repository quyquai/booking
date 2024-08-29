import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './AddHotel.module.css';
import { isNotEmpty } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function AddHotel() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [desc, setDesc] = useState('');
  const [photos, setPhotos] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [cheapestPrice, setCheapestPrice] = useState('');
  const [featured, setFeatured] = useState('');
  const [selectedRoom, setselectedRoom] = useState([]);

  const [err, setErr] = useState('');

  const [roomsList, setRoomsList] = useState([]);

  async function fetchRoom() {
    try {
      const response = await fetch('http://localhost:5000/admin/rooms');
      const result = await response.json();
      setRoomsList(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  const toggleLang = (option) => {
    if (selectedRoom.includes(option)) {
      setselectedRoom(selectedRoom.filter((item) => item !== option));
    } else {
      setselectedRoom([...selectedRoom, option]);
    }
  };

  const addHotelHandler = (e) => {
    e.preventDefault();

    const hotels = {
      name,
      city,
      distance,
      desc,
      photos,
      type,
      address,
      title,
      cheapestPrice,
      featured,
      rooms: selectedRoom,
    };

    if (!isNotEmpty(name)) {
      setErr('Please enter the name field');
      return;
    }
    if (!isNotEmpty(city)) {
      setErr('Please enter the city field');
      return;
    }
    if (!isNotEmpty(distance)) {
      setErr('Please enter the distance field');
      return;
    }
    if (!isNotEmpty(desc)) {
      setErr('Please enter the description field');
      return;
    }
    if (!isNotEmpty(photos)) {
      setErr('Please enter the images field');
      return;
    }
    if (!isNotEmpty(type)) {
      setErr('Please enter the type field');
      return;
    }
    if (!isNotEmpty(address)) {
      setErr('Please enter the address field');
      return;
    }
    if (!isNotEmpty(title)) {
      setErr('Please enter the title field');
      return;
    }
    if (!isNotEmpty(cheapestPrice)) {
      setErr('Please enter the Price field');
      return;
    }
    if (!isNotEmpty(featured)) {
      setErr('Please enter the Featured field');
      return;
    }
    if (selectedRoom.length === 0) {
      setErr('Please enter the rooms field');
      return;
    }

    async function fetchPostHotel() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hotels),
          redirect: 'follow',
        };
        const response = await fetch('http://localhost:5000/admin/add-hotels', requestOptions);
        const result = await response.json();
        if (response.status === 200) {
          alert(result.message);
          navigate('/hotels');
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostHotel();
  };

  return (
    <div className={classes['add-hotel-container']}>
      <div className={classes['add-hotel-header']}>Add New Product</div>
      <form onSubmit={addHotelHandler}>
        {err && <p className={classes.err}>{err}</p>}
        <div className={classes['add-hotel-form']}>
          <div className={classes['form-section']}>
            <div className={classes['form-group']}>
              <label htmlFor="name" className={classes['form-label']}>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="My Hotel"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="city" className={classes['form-label']}>
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                name="city"
                placeholder="City"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="center" className={classes['form-label']}>
                Distance from City Center
              </label>
              <input
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                type="text"
                name="distance"
                placeholder="500"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="description" className={classes['form-label']}>
                Description
              </label>
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                name="desc"
                placeholder="description"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="images" className={classes['form-label']}>
                Images
              </label>
              <textarea
                value={photos}
                onChange={(e) => setPhotos(e.target.value)}
                rows={2}
                name="photos"
                className={classes['form-input']}
              ></textarea>
            </div>
          </div>
          <div className={classes['form-group']}>
            <div className="form-group">
              <label htmlFor="type" className={classes['form-label']}>
                Type
              </label>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                type="text"
                name="type"
                placeholder="hotel"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="address" className={classes['form-label']}>
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="address"
                placeholder="Address"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="title" className={classes['form-label']}>
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="Title"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="price" className={classes['form-label']}>
                Price
              </label>
              <input
                value={cheapestPrice}
                onChange={(e) => setCheapestPrice(e.target.value)}
                type="text"
                name="cheapestPrice"
                placeholder="100"
                className={classes['form-input']}
              />
            </div>
            <div className={classes['form-group']}>
              <label htmlFor="featured" className={classes['form-label']}>
                Featured
              </label>
              <select
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
                name="featured"
                className={classes['form-select']}
              >
                <option value="">No</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="rooms" className={classes['form-label']}>
            Rooms
          </label>

          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-light text-body me-3">
                Select Options
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {roomsList.map((room, index) => (
                  <Dropdown.Item key={index} onClick={() => toggleLang(room)} active={selectedRoom.includes(room)}>
                    {room.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              <span>{selectedRoom.map((item) => item.title).join(', ')}</span>
            </Dropdown>
          </div>
        </div>
        <button type="submit" className={classes['form-button']}>
          Send
        </button>
      </form>
    </div>
  );
}
