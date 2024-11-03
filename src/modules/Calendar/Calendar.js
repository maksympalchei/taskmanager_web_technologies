import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './index.css';

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h3>{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
      <Calendar
        onChange={onChange}
        value={date}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
}

export default CustomCalendar;
