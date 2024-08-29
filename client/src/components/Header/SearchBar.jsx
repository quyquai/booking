import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCalendarDays,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../store/SearchContext';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import classes from './SearchBar.module.css';

export default function SearchBar() {
  const { setSearchParams } = useContext(SearchContext);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [destination, setDestination] = useState('');

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchParams({
      city: destination,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      numberOfRooms: options.room,
      numberOfAdults: options.adult,
      numberOfChildren: options.children,
    });
    navigate('/search', { state: { destination, date, options } });
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
    }));
  };

  return (
    <div className={classes.search}>
      <div className={classes['search-item']}>
        <FontAwesomeIcon icon={faBed} className={classes.icon} />
        <input
          type="text"
          placeholder="Where are you going?"
          className={classes.input}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className={classes['search-item']}>
        <FontAwesomeIcon icon={faCalendarDays} className={classes.icon} />
        <span
          onClick={() => setOpenDate(!openDate)}
          className={classes['search-text']}
        >{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
          date[0].endDate,
          'MM/dd/yyyy',
        )}`}</span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className={classes.date}
            minDate={new Date()}
          />
        )}
      </div>
      <div className={classes['search-item']}>
        <FontAwesomeIcon icon={faPerson} className={classes.icon} />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className={classes['search-text']}
        >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
        {openOptions && (
          <div className={classes.options}>
            <div className={classes['option-item']}>
              <span>Adult</span>
              <div className={classes['option-counter']}>
                <button
                  disabled={options.adult <= 1}
                  onClick={() => handleOption('adult', 'd')}
                >
                  -
                </button>
                <span>{options.adult}</span>
                <button onClick={() => handleOption('adult', 'i')}>+</button>
              </div>
            </div>
            <div className={classes['option-item']}>
              <span className="optionText">Children</span>
              <div className={classes['option-counter']}>
                <button
                  disabled={options.children <= 0}
                  onClick={() => handleOption('children', 'd')}
                >
                  -
                </button>
                <span>{options.children}</span>
                <button onClick={() => handleOption('children', 'i')}>+</button>
              </div>
            </div>
            <div className={classes['option-item']}>
              <span>Room</span>
              <div className={classes['option-counter']}>
                <button
                  disabled={options.room <= 1}
                  onClick={() => handleOption('room', 'd')}
                >
                  -
                </button>
                <span>{options.room}</span>
                <button onClick={() => handleOption('room', 'i')}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes['search-item']}>
        <button className={classes.btn} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
