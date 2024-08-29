import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './HotelInfo.module.css';

export default function HotelInfo({ hotel }) {
  return (
    <>
      <h1 className={classes.title}>{hotel.title}</h1>
      <div className={classes.address}>
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{hotel.address}</span>
      </div>
      <span className={classes.distance}>
        Excellent location – {hotel.distance}m from center
      </span>
      <span className={classes.price}>
        Book a stay over ${hotel.cheapestPrice} at this property and get a free
        airport taxi
      </span>
    </>
  );
}
