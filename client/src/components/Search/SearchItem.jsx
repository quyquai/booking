import { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../../store/SearchContext';

import classes from './SearchItem.module.css';
import { useNavigate } from 'react-router-dom';

export default function SearchItem() {
  const { searchParams } = useContext(SearchContext);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const query = new URLSearchParams(searchParams).toString();

        const response = await fetch(
          `http://localhost:5000/hotels/search?${query}`,
        );
        const data = await response.json();

        setHotels(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handlerClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className={classes.content}>
      {hotels.map((hotel) => (
        <div className={classes.item} key={hotel._id}>
          <img src={hotel.photos[0]} alt="" className={classes.img} />
          <div className={classes.desc}>
            <h1 className={classes.title}>{hotel.name}</h1>
            <span className={classes.distance}>
              {hotel.distance} from center
            </span>
            <span className={classes['sub-title']}>{hotel.desc}</span>
            <span className={classes.features}>{hotel.type}</span>
          </div>
          <div className={classes.detail}>
            <div className={classes.rating}>
              <span>{hotel.rating}</span>
              <button>Rating</button>
            </div>
            <div className={classes['detail-text']}>
              <span className={classes.price}>${hotel.cheapestPrice}</span>
              <span className={classes.taxi}>Includes taxes and fees</span>
              <button
                className={classes.btn}
                onClick={() => handlerClick(hotel._id)}
              >
                See availability
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
