import React from "react";

function FormCheckbox({ classNameValue, changeHandler, inputId, inputValue, inputLabel, checkedValue }) {
  return (
    <div className={`${classNameValue} custom-control custom-checkbox  custom-control-inline`}>
      <input type="checkbox" className="custom-control-input" name={inputId} id={inputId} value={inputValue} onChange={changeHandler} checked={checkedValue} />
      <label className="custom-control-label text-muted" htmlFor={inputId}>
        <small>{inputLabel}</small>
      </label>
    </div>
  );
}

export default FormCheckbox;
