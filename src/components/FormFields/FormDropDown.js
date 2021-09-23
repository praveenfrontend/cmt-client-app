import React from "react";

function FormDropDown({ classNameValue, changeHandler, inputId, inputValue, dataValue, inputLabel, checkedValue }) {
  return (
    <div class="form-group row">
      <label class="col-sm-2 form-control-label">Select</label>
      <div class="col-sm-10 mb-3">
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
