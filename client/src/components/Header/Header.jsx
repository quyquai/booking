import classes from './Header.module.css';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserSection from './UserSection';

export default function Header({ type }) {
  return (
    <div className={classes.header}>
      <div
        className={
          type === 'list'
            ? `${classes.container} ${classes.list}`
            : classes.container
        }
      >
        <Navigation />
        {type !== 'list' && (
          <>
            <UserSection />
            <SearchBar />
          </>
        )}
      </div>
    </div>
  );
}
