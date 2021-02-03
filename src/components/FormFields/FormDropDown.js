import React from "react";

function FormDropDown({ classNameValue, changeHandler, inputId, inputValue, inputLabel, checkedValue }) {
  return (
    <div className={`${classNameValue} form-group row`}>
      <label class="col-sm-4 form-control-label">{inputLabel}</label>
      <div class="col-sm-8 mb-3">
        <select name="account" class="form-control">
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
      </div>
    </div>
  );
}

export default FormDropDown;

/* <div class="form-group row">
  <label class="col-sm-2 form-control-label">Select</label>
  <div class="col-sm-10 mb-3">
    <select name="account" class="form-control">
      <option>option 1</option>
      <option>option 2</option>
      <option>option 3</option>
      <option>option 4</option>
    </select>
  </div>  
</div>; */
