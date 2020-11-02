import React from "react";
import FormButton from "./FormButton";

function CardFooter({ buttonValue, footerText }) {
  return (
    <div className="card-footer">
      <p className="card-text text-dark">{footerText}</p>
      <FormButton buttonValue={buttonValue} />
    </div>
  );
}

export default CardFooter;
