import { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

import classes from './SearchHotel.module.css';
import { SearchContext } from '../../store/SearchContext';
import { toLocalISOString } from '../../utils/formatDate';

export default function SearchHotel() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const { setSearchParams } = useContext(SearchContext);

  const startDate = date[0]?.startDate;
  const endDate = date[0]?.endDate;

  const handleSearch = () => {
    if (!startDate || !endDate || date.length === 0) return;
    const dateStart = toLocalISOString(startDate);
    const dateEnd = toLocalISOString(endDate);
    setSearchParams({
      city: destination,
      dateStart,
      dateEnd,
      numberOfRooms: options.room,
      numberOfAdults: options.adult,
      numberOfChildren: options.children,
    });
  };
  return (
    <div className={classes.search}>
      <h2 className={classes.title}>Search</h2>
      <div className={classes.item}>
        <label>Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className={classes.item}>
        <label>Check-in Date</label>
        <span onClick={() => setOpenDate(!openDate)}>{`${format(
          date[0].startDate,
          'MM/dd/yyyy',
        )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
        {openDate && (
          <DateRange
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            ranges={date}
          />
        )}
      </div>
      <div className={classes.item}>
        <label>Options</label>
        <div className={classes.option}>
          <div className={classes['option-item']}>
            <span>
              Min price <small>per night</small>
            </span>
            <input type="number" />
          </div>
          <div className={classes['option-item']}>
            <span>
              Max price <small>per night</small>
            </span>
            <input type="number" />
          </div>
          <div className={classes['option-item']}>
            <span>Adult</span>
            <input
              type="number"
              value={options.adult}
              onChange={(e) => setOptions({ adult: e.target.value })}
            />
          </div>
          <div className={classes['option-item']}>
            <span>Children</span>
            <input
              type="number"
              min={0}
              value={options.children}
              onChange={(e) => setOptions({ children: e.target.value })}
            />
          </div>
          <div className={classes['option-item']}>
            <span>Room</span>
            <input
              type="number"
              min={0}
              value={options.room}
              onChange={(e) => setOptions({ room: e.target.value })}
            />
          </div>
        </div>
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
