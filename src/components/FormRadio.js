import React from "react";

function FormRadio({ classNameValue, changeHandler, inputId, inputName, inputValue, inputLabel, checkedValue }) {
  return (
    <div className={`${classNameValue} custom-control custom-radio custom-control-inline`}>
      <input type="radio" className="custom-control-input" id={inputId} name={inputName} value={inputValue} onChange={changeHandler} checked={checkedValue === inputValue} />
      <label className="custom-control-label text-muted" htmlFor={inputId}>
        <small>{inputLabel}</small>
      </label>
    </div>
  );
}

export default FormRadio;
