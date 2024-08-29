import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';

export default function Dates({ onSaveDate }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  useEffect(() => {
    onSaveDate(state);
  }, [state, onSaveDate]);

  return (
    <div>
      <h2>Dates</h2>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
}
