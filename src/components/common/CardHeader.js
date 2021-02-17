import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function CardHeader({ cardHeaderValue, download, filename }) {
  return (
    <div className="card-header bg-primary d-flex justify-content-between">
      <h1 className="text-white">{cardHeaderValue}</h1>
      {download ? (
        <span className="text-white d-flex justify-content-around">
          <ReactHTMLTableToExcel id="test-table-xls-button" className="btn btn-success" table="table-to-xls" filename={filename} sheet={filename} buttonText="Download to Excel" />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardHeader;
