import { useEffect, useState } from 'react';
import Dates from './Dates';
import ReserveInfo from './ReserveInfo';
import classes from './BookNow.module.css';
import SelectRoom from './SelectRoom';
import { toLocalISOString } from '../../utils/formatDate';

export default function BookNow({ hotel }) {
  const [dates, setDates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const dateHandler = (date) => {
    setDates(date);
  };

  const selectedDates = dates.length > 0 ? dates[0] : null;

  const startDate = dates[0]?.startDate;
  const endDate = dates[0]?.endDate;

  async function fetchRoom() {
    if (!startDate || !endDate || dates.length === 0) return;
    const dateStart = toLocalISOString(startDate);
    const dateEnd = toLocalISOString(endDate);
    if (dates.length === 0) return;
    const query = new URLSearchParams({
      id: hotel._id,
      dateStart,
      dateEnd,
    }).toString();

    try {
      const response = await fetch(`http://localhost:5000/rooms?${query}`);
      const result = await response.json();
      setRooms(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, [dates]);

  return (
    <>
      <div className={classes.container}>
        <Dates onSaveDate={dateHandler} />
        <ReserveInfo />
      </div>
      <SelectRoom dates={selectedDates} rooms={rooms} hotelId={hotel._id} />
    </>
  );
}
