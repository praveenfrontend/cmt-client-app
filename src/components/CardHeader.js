import React from "react";

function CardHeader({ cardHeaderValue }) {
  return (
    <div className="card-header bg-primary text-center p-1">
      <h3 className="text-white">{cardHeaderValue}</h3>
    </div>
  );
}

export default CardHeader;
