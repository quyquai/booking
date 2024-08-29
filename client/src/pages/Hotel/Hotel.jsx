import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';

import classes from './Hotel.module.css';
import MailList from '../../components/Home/MailList';
import ImageSlider from '../../components/Hotel/ImageSlider';
import HotelInfo from '../../components/Hotel/HotelInfo';
import HotelDetail from '../../components/Hotel/HotelDetail';
import BookNow from '../../components/Booked/BookNow';

export default function Hotel() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [hotel, setHotel] = useState([]);
  const [booking, setBooking] = useState(false);

  async function fetchHotel() {
    try {
      const response = await fetch(`http://localhost:5000/hotels/${id}`);
      const result = await response.json();
      setHotel(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHotel();
  }, []);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  return (
    <div>
      <Header type="list" />
      <div className={classes.container}>
        {open && (
          <ImageSlider
            setOpen={setOpen}
            hotel={hotel}
            setSlideNumber={setSlideNumber}
            slideNumber={slideNumber}
          />
        )}
        <div className={classes.wrapper}>
          <HotelInfo hotel={hotel} />
          <div className={classes['hotel-image']}>
            {hotel.photos &&
              hotel.photos.map((photo, i) => (
                <div className={classes['hotel-image__wrapper']} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className={classes['hotel-img']}
                  />
                </div>
              ))}
          </div>
          <HotelDetail hotel={hotel} setBooking={setBooking} />
        </div>
        {booking && <BookNow hotel={hotel} />}
        <MailList />
      </div>
    </div>
  );
}
