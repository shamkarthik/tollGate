import React from "react";

const TableRow = ({ rowData, columns }) => {
    const vehicleDropdown = [
        { value: 1, label: "Car/Jeep/Van" },
        { value: 2, label: "LCV" },
        { value: 3, label: "Truck/Bus" },
        { value: 4, label: "Heavy vehicle" }
      ]
    return (
        <tr>
            {columns.map(({ path,name }) => (
                <td key={path + name}>
                    { path === "vehicleType" ? vehicleDropdown.find(vehicle => vehicle.value.toString() === rowData[path] ).label : 
                     rowData[path]}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;