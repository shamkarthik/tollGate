import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared-components/Button'
import InputField from '../../shared-components/InputField'
import PopUp from '../../shared-components/Popup'
import Table from '../../shared-components/Table'
import AddTollEntries from '../addTollEntries/AddTollEntries'
import AddTollGate from '../addTollGate/AddTollGate'

const ListTollGate = () => {
    const [addTollEntryPopup, setAddTollEntryPopup] = useState(false)
    const [addTollGatePopup, setAddTollGatePopup] = useState(false)
    const tollGateList = useSelector((state) => state.tollGate?.tollGateList)

    const [initialTollGateList, setInitialTollGateList] = useState([])
    const [tollNameSearch, setTollNameSearch] = useState("")
    let navigate = useNavigate();
    const columns = [
        { path: "tollName", name: "Toll name" },
        { path: 1, name: "Car/Jeep/Van" },
        { path: 2, name: "LCV" },
        { path: 3, name: "Truck/Bus" },
        { path: 4, name: "Heavy vehicle" },
    ];
    const [tariffRowData, setTariffRowData] = useState([])
    useEffect(() => {
        let tariffDetails = []
        if (initialTollGateList.length > 0){
            tariffDetails = initialTollGateList.map(tollgate => { return { tollName: tollgate.tollName, ...Object.assign({}, ...tollgate.tariff.map(data => { return { [data.vehicleType + ""]: data.fromAndTo } })) } })
        }
        setTariffRowData(tariffDetails)
    }, [initialTollGateList])
    useEffect(() => {
        setInitialTollGateList(tollGateList)
    }, [tollGateList])
    const backToVehicleLogs = () => {
        navigate('/listEntries')
    }
    const filterTollName = (e) => {
        setTollNameSearch(e.target.value)
        console.log(tariffRowData)
        setInitialTollGateList(tollGateList.filter(toll => toll.tollName.match(e.target.value)))
    }
    return (
        <>
            <div>
                <h1>TollGate List</h1>
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
                    value={"Back to vehicle logs"}
                    isDisabled={false}
                    clickHandler={backToVehicleLogs}
                />
                <InputField
                    value={tollNameSearch || ''}
                    type='text'
                    placeholder='Search Toll Name'
                    onChange={filterTollName}
                    name="tollName"
                />
            </div>
            <div>
                {tariffRowData ? <Table columns={columns} rawData={tariffRowData} /> : <div>No Toll Gate Details</div>}
                {addTollEntryPopup && <PopUp setPopUp={setAddTollEntryPopup} children={<AddTollEntries />} heading={"Adding Toll Entries"} />}
                {addTollGatePopup && <PopUp setPopUp={setAddTollGatePopup} children={<AddTollGate />} heading={"Adding Toll Gate"} />}
            </div>
        </>
    )
}

export default ListTollGate