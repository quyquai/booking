import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, toLocalISOString } from '../../utils/formatDate';
import { UserContext } from '../../store/UserContext';
import classes from './SelectRoom.module.css';

export default function SelectRoom({ dates, rooms, hotelId }) {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const endDate = dates && dates.endDate;
  const startDate = dates && dates.startDate;

  const handleSelect = (roomNumber) => {
    setSelectedRooms((prev) =>
      prev.includes(roomNumber)
        ? prev.filter((number) => number !== roomNumber)
        : [...prev, roomNumber],
    );
  };

  console.log(rooms);

  const getTotalPrice = () => {
    const numberOfDays =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const roomPrices = rooms.map((room) => {
      return (
        room.roomNumbers.filter((number) => selectedRooms.includes(number))
          .length * room.room.price
      );
    });

    const totalPrice = roomPrices.reduce((acc, price) => acc + price, 0);
    return totalPrice * numberOfDays;
  };

  const handleReserve = async () => {
    if (!user) {
      return navigate('/login');
    }
    if (selectedRooms.length === 0) {
      return alert('Please select a room!');
    }
    if (paymentMethod === '') {
      return alert('Please select payment method!');
    }
    const totalPrice = getTotalPrice();
    const dateStart = toLocalISOString(startDate);
    const dateEnd = toLocalISOString(endDate);

    const transaction = JSON.stringify({
      user: user._id, // Replace with actual user ID
      hotel: hotelId,
      room: selectedRooms,
      dateStart,
      dateEnd,
      price: totalPrice,
      payment: paymentMethod,
      status: 'Booked',
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: transaction,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'http://localhost:5000/transactions',
        requestOptions,
      );
      if (response.status === 201) {
        // Redirect to Transaction Dashboard
        navigate('/transactions');
      } else {
        const error = await response.json();
        console.error('Failed to create transaction:', error);
        // Handle error appropriately
      }
    } catch (error) {
      console.error('Failed to create transaction:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className={classes['select-room-container']}>
      <h2>Select Rooms</h2>
      <div className={classes['rooms-list']}>
        {rooms &&
          rooms.map((room, index) => (
            <div className={classes['room-item']} key={index}>
              <div className={classes['room-details']}>
                <p className={classes['room-title']}>{room.room.title}</p>
                <p className={classes['room-payment-deadline']}>
                  Pay nothing until {formatDate(endDate)}
                </p>
                <p className={classes['room-max-people']}>
                  Max people: {room.room.maxPeople}
                </p>
                <p className={classes['room-price']}>${room.room.price}</p>
              </div>
              {room.roomNumbers.map((roomNumber, idx) => (
                <div key={idx} className={classes['room-number-item']}>
                  <p className={classes['room-number']}>{roomNumber}</p>
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(roomNumber)}
                    onChange={() => handleSelect(roomNumber)}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className={classes['totalPrice']}>
        <h3>Total Bill: ${getTotalPrice()}</h3>
      </div>
      <div className={classes['payment-method-section']}>
        <select
          className={classes['payment-method-select']}
          id="payment"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>
        <button className={classes['reserve-button']} onClick={handleReserve}>
          Reserve Now
        </button>
      </div>
    </div>
  );
}
