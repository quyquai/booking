import Header from '../../components/Header/Header';
import SearchHotel from '../../components/Search/SearchHotel';
import SearchItem from '../../components/Search/SearchItem';

import classes from './Search.module.css';

export default function SearchPage() {
  return (
    <div>
      <Header type="list" />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <SearchHotel />
          <SearchItem />
        </div>
      </div>
    </div>
  );
}
