import React from "react";

function FormRadio({ classNameValue, changeHandler, inputId, inputValue, inputLabel, checkedValue }) {
  return (
    <div className={`${classNameValue} custom-control custom-radio custom-control-inline`}>
      <input type="radio" className="custom-control-input" id={inputId} name={inputValue} value={inputId} onChange={changeHandler} checked={checkedValue === inputId} />
      <label className="custom-control-label text-muted" htmlFor={inputId}>
        <small>{inputLabel}</small>
      </label>
    </div>
  );
}

export default FormRadio;
