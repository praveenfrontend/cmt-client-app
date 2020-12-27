import React from "react";

function TableRow({ rows, colSpan }) {
  return rows !== null ? (
    Object.keys(rows).map((key, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{key}</td>
        <td>{rows[key]}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={colSpan}>
        <p className="text-center text-bold">No Data Available</p>
      </td>
    </tr>
  );
}

export default TableRow;
