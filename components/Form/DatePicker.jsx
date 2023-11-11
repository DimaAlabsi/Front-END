import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({ onChange, selected, title }) {
  return (
    <div >
      <label className="label">{title}</label>
      <DatePicker
        showIcon
        inline
        showDisabledMonthNavigation
        selected={selected}
        onChange={onChange}
      />
    </div>
  );
}
