import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './FeaturedProperties.module.css';

export default function FeaturedProperties() {
  const [hotels, setHotels] = useState([]);

  async function fetchRating() {
    const response = await fetch('http://localhost:5000/hotels/rating');
    const result = await response.json();
    setHotels(result);
  }

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <div className={classes.featured}>
      {hotels.map((hotel) => (
        <div key={hotel._id} className={classes['featured-item']}>
          <img
            className={classes.img}
            src={hotel.photos[0]}
            alt={hotel.title}
          />
          <span className={classes['featured-name']}>
            <Link to={`/hotels/${hotel._id}`}>{hotel.name}</Link>
          </span>
          <span className={classes['featured-city']}>{hotel.city}</span>
          <span className={classes['featured-price']}>
            Starting from ${hotel.cheapestPrice}
          </span>
        </div>
      ))}
    </div>
  );
}
