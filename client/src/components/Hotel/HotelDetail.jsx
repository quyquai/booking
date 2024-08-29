import classes from './HotelDetail.module.css';

export default function HotelDetail({ hotel, setBooking }) {
  const bookingHandler = () => {
    setBooking(true);
  };

  return (
    <div className={classes.detail}>
      <div className={classes['detail-text']}>
        <h1 className={classes.title}>{hotel.title}</h1>
        <p className={classes.desc}>{hotel.desc}</p>
      </div>
      <div className={classes['detail-price']}>
        <h2>
          <b>${hotel.cheapestPrice}</b> (1 nights)
        </h2>
        <button onClick={() => bookingHandler()}>Reserve or Book Now!</button>
      </div>
    </div>
  );
}
