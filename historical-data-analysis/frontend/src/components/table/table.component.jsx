import React from "react";

import Table from 'react-bootstrap/Table';



const NewTable = ({ headings, rows, renderCell }) => {
  return (
    <Table responsive variant="light" bordered>
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index} style={{ textAlign: 'center' }}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{row.name}</td>
            {headings.slice(1).map((_, cellIndex) => (
              <td key={cellIndex} style={{ textAlign: 'center' }}>
                {renderCell(row, cellIndex +1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}


export default NewTable;