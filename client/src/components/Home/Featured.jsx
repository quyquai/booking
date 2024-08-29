import hanoiImage from '../../assets/Ha Noi.jpg';
import hcmImage from '../../assets/HCM.jpg';
import danangImage from '../../assets/Da Nang.jpg';
import { useEffect, useState } from 'react';

import classes from './Featured.module.css';

export default function Featured() {
  const [cityData, setCityData] = useState({});
  async function fetchCity() {
    try {
      const response = await fetch('http://localhost:5000/hotels/city');
      const result = await response.json();
      setCityData(result);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCity();
  }, []);
  return (
    <div className={classes.featured}>
      <div className={classes['featured-item']}>
        <img
          src={hanoiImage}
          alt="Ha Noi"
          className={classes['featured-img']}
        />
        <div className={classes['featured-titles']}>
          <h1>Ha Noi</h1>
          <h2>{cityData['Ha Noi']} properties</h2>
        </div>
      </div>

      <div className={classes['featured-item']}>
        <img
          src={hcmImage}
          alt="Ho Chi Minh"
          className={classes['featured-img']}
        />
        <div className={classes['featured-titles']}>
          <h1>Ho Chi Minh</h1>
          <h2>{cityData['Ho Chi Minh']} properties</h2>
        </div>
      </div>
      <div className={classes['featured-item']}>
        <img
          src={danangImage}
          alt="Da Nang"
          className={classes['featured-img']}
        />
        <div className={classes['featured-titles']}>
          <h1>Da Nang</h1>
          <h2>{cityData['Da Nang']} properties</h2>
        </div>
      </div>
    </div>
  );
}
