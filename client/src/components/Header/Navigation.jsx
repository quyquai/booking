import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Navigation.module.css';

export default function Navigation() {
  return (
    <div className={classes['header-list']}>
      <div className={`${classes['header-item']} ${classes.active}`}>
        <FontAwesomeIcon icon={faBed} />
        <span>Stays</span>
      </div>
      <div className={classes['header-item']}>
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
      </div>
      <div className={classes['header-item']}>
        <FontAwesomeIcon icon={faCar} />
        <span>Car rentals</span>
      </div>
      <div className={classes['header-item']}>
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
      </div>
      <div className={classes['header-item']}>
        <FontAwesomeIcon icon={faTaxi} />
        <span>Airport taxis</span>
      </div>
    </div>
  );
}
