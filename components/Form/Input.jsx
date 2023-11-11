import React from "react";

const Input = ({
  placeholder,
  icon,
  type,
  name,
  onChange,
  isTextarea,
  required,
  min,
  validationError
}) => {
  const inputProps = {
    type: type,
    className:
      "p-[0.5rem] bg-[#1C1A3C] text-white border-[#4d4f66] border  w-[100%]  h-[4vh] rounded-[5px] text-sm placeholder:text-xs  placeholder:text-white placeholder:font-light",
    placeholder: placeholder,
    autoComplete: "off",
    name: name,
    onChange: onChange,
    required: required,
  };

  return (
    <div className="relative   mb-4">
     
      <div className="absolute top-[25%] left-[10px] text-white">{icon}</div>

      {isTextarea ? <textarea   {...inputProps} /> : <input min={min}  {...inputProps} />}
      {validationError && (
        <div className="error-message">
        * {validationError}
        </div>
      )}
    </div>
  );
};

export default Input;
