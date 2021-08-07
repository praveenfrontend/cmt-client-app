import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function CardHeader({ cardHeaderValue, grade, upload, download, filename, schedule, clickHandler }) {
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
      {schedule && <input type="submit" value="Create Schedule" className={"btn btn-success"} onClick={() => clickHandler()} />}
      {upload && <input type="submit" value="Upload New" className={"btn btn-success"} onClick={() => clickHandler()} />}
      {grade && <input type="submit" value="Set Grade" className={"btn btn-success"} onClick={() => clickHandler()} />}
    </div>
  );
}

export default CardHeader;
