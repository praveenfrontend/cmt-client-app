import React from "react";
import { CSSTransition } from "react-transition-group";

function FormInput({ type, icon, placeholder, changeHandler, inputField, message, value, name }) {
  return (
    <div className="form-group">
      <div className="input-group input-group-mb">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className={`${icon}`}></i>
          </span>
        </div>
        <input type={type} className="form-control" placeholder={placeholder} autoComplete="off" onChange={changeHandler} value={value} name={name} />
      </div>
      <CSSTransition in={inputField} timeout={330} classNames="liveValidateMessage" unmountOnExit>
        <div className="alert alert-danger small liveValidateMessage">{message}</div>
      </CSSTransition>
    </div>
  );
}

export default FormInput;
