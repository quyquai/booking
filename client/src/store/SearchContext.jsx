/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    dateStart: '',
    dateEnd: '',
    numberOfRooms: 1,
    numberOfAdults: 1,
    numberOfChildren: 0,
  });

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
