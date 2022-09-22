import React from "react";
import TableHeadItem from "./TableHeadItem";
import TableRow from "./TableRow";
import './Table.css';

const Table = ({ columns, rawData, customClass }) => {
  // const theadData = Object.keys(rawData[0]).filter((title) => title !== "id")
  // const tbodyData = rawData.map((data) => {
  //   return {
  //     id: data.id, 
  //     items: Object.values(Object.keys(data).filter(key =>
  //       key !== 'id').reduce((obj, key) => {
  //         obj[key] = data[key];
  //         return obj;
  //       }, {}
  //       ))
  //     }
  //   })
  return (
    <table className={customClass}>
      <thead>
        <tr>
          {/* {columns.map((h) => {
                        return <TableHeadItem key={h} item={h} />;
                    })} */}
          {columns.map(({ path, name }) => {
            return <TableHeadItem key={path} name={name}/>;
          })}
        </tr>
      </thead>
      <tbody>
        { rawData.map((item) => {
          return <TableRow key={item.id || item.tollName} columns={columns} rowData={item} />;
        }) }
      </tbody> 
    </table>
  );
};

export default Table;