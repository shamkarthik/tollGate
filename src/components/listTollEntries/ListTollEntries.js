import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared-components/Button'
import Dropdown from '../../shared-components/Dropdown'
import InputField from '../../shared-components/InputField'
import PopUp from '../../shared-components/Popup'
import Table from '../../shared-components/Table'
import AddTollEntries from '../addTollEntries/AddTollEntries'
import AddTollGate from '../addTollGate/AddTollGate'

const ListTollEntries = () => {
    let navigate = useNavigate();
    const [addTollEntryPopup, setAddTollEntryPopup] = useState(false)
    const [addTollGatePopup, setAddTollGatePopup] = useState(false)
    const tollEntriesList = useSelector((state) => state.tollEntry?.tollEntriesList)
    const tollGateList = useSelector((state) => state.tollGate?.tollGateList)
    const [vehicleNumber, setVehicleNumber] = useState("")
    const [tollNameSearch, setTollNameSearch] = useState("")
    const [tollEntriesRowData, setTollEntriesRowData] = useState([])
    const [tollGateDropDownData, setTollGateDropDownData] = useState([])
    const columns = [
        { path: "vehicleType", name: "Vehicle Type" },
        { path: "vehicleNumber", name: "Vehicle Number" },
        { path: "entryDateTime", name: "Date/Time" },
        { path: "tollName", name: "Toll Name" },
        { path: "tariff", name: "Tariff" },
    ];
    const navigateToTollGateList = () => {
        navigate('/listGate')
    }
    const onSearchVehicle = (e) => {
        setVehicleNumber(e.target.value)
        console.log(tollEntriesList)
        setTollEntriesRowData(tollEntriesList.filter(tollEntry => 
            tollEntry.vehicleNumber.match(e.target.value)
            && tollEntry.tollName.match(tollNameSearch) 
            ))
    }
    useEffect(() => {
        const tollList = tollGateList.map(tollgate => { return { value: tollgate.tollName, label: tollgate.tollName } })
        setTollGateDropDownData(tollList)
        setTollEntriesRowData(tollEntriesList)
    }, [tollEntriesList, tollGateList])

    const filterTollName = (e) => {
        setTollNameSearch(e.target.value)
        setTollEntriesRowData(tollEntriesList.filter(tollEntry => 
            tollEntry.tollName.match(e.target.value) 
            && tollEntry.vehicleNumber.match(vehicleNumber)
            ))
    }
    return (
        <>
            <div>
                <h1>Vehicle Entry Log</h1>
            </div>
            <div>
                <Button
                    id={"btnInsert"}
                    type={"Submit"}
                    value={"Add Vehicle Entry"}
                    isDisabled={false}
                    clickHandler={() => setAddTollEntryPopup(true)}
                />
                <Button
                    id={"btnInsert"}
                    type={"Submit"}
                    value={"Add Toll Gate"}
                    isDisabled={false}
                    clickHandler={() => setAddTollGatePopup(true)}
                />
                <Button
                    id={"btnInsert"}
                    type={"Submit"}
                    value={"View all tolls"}
                    isDisabled={false}
                    clickHandler={navigateToTollGateList}
                />
                <InputField
                    value={vehicleNumber || ''}
                    type='text'
                    placeholder='Search Vehicle Number'
                    onChange={onSearchVehicle}
                    name="vehicleNumber"
                />
                <Dropdown
                    data={tollGateDropDownData}
                    value={tollNameSearch || ''}
                    label='Flter by tollName'
                    placeholder='Flter by tollName'
                    onChange={filterTollName}
                    name="tollNameSearch"
                />
            </div>
            <div>
                {tollEntriesRowData ? <Table columns={columns} rawData={tollEntriesRowData} /> : <div>No Toll Entries</div>}
                {addTollEntryPopup && <PopUp setPopUp={setAddTollEntryPopup} children={<AddTollEntries />} heading={"Adding Toll Entries"} />}
                {addTollGatePopup && <PopUp setPopUp={setAddTollGatePopup} children={<AddTollGate />} heading={"Adding Toll Gate"} />}
            </div>
        </>
    )
}

export default ListTollEntries