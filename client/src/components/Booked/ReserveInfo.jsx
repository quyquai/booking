import { useContext, useState } from 'react';
import classes from './ReserveInfo.module.css';
import { UserContext } from '../../store/UserContext';

export default function ReserveInfo() {
  const { user } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({
    fullName: user ? user.fullName : '',
    email: user ? user.email : '',
    phoneNumber: user ? user.phoneNumber : '',
    // Add other fields as needed
    identityCardNumber: '', // Example: Identity Card Number field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Reserve Info</h2>
      <form>
        <div className={classes.form}>
          <label htmlFor="fullName">Your Full Name:</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={userInfo.fullName}
            placeholder="Full Name"
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.form}>
          <label htmlFor="email">Your Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            value={userInfo.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.form}>
          <label htmlFor="phoneNumber">Your Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={userInfo.phoneNumber}
            placeholder="Phone Number"
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.form}>
          <label htmlFor="identityCardNumber">Your Identity Card Number:</label>
          <input
            id="identityCardNumber"
            name="identityCardNumber"
            type="text"
            value={userInfo.identityCardNumber}
            placeholder="Card Number"
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
