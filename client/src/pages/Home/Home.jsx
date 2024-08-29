import { useContext, useEffect } from 'react';
import { UserContext } from '../../store/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import classes from './Home.module.css';
import Featured from '../../components/Home/Featured';
import PropertyList from '../../components/Home/PropertyList';
import FeaturedProperties from '../../components/Home/FeaturedProperties';
import MailList from '../../components/Home/MailList';

export default function HomePage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
  return (
    <div>
      <Header />
      <div className={classes.container}>
        <Featured />
        <h2 className={classes.title}>Browse by property type</h2>
        <PropertyList />
        <h2 className={classes.title}>Homes guests love</h2>
        <FeaturedProperties />
        <MailList />
      </div>
    </div>
  );
}
