import React from "react";

function Table(props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {props.tableHeader.map((thead, index) => (
              <th key={index}>{thead}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}

export default Table;
