import React from "react";

function CardHeader({ cardHeaderValue }) {
  return (
    <div className="card-header bg-primary">
      <h1 className="text-white">{cardHeaderValue}</h1>
    </div>
  );
}

export default CardHeader;
