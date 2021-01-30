import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateRenderer = (props) => {
  const [date, setStartDate] = useState(new Date());
  return (
    <DatePicker value = {date} selected={date} onChange={date => setStartDate(date)} />
  );
};


export default DateRenderer;