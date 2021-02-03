import React  from "react";
import { DatePicker, Space } from 'antd';
import moment from 'moment';


import 'antd/dist/antd.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
function DateRenderer(props) {
  const dateFormat = 'DD/MM/YY';
  return (
    <div>
      <Space direction="vertical">
      <DatePicker defaultValue={moment('01/01/15', dateFormat)} format={dateFormat} />
      </Space>
    </div>
  );
}
export default DateRenderer;