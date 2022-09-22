import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../shared-components/Button';
import Dropdown from '../../shared-components/Dropdown'
import { useValidator } from '../../shared-components/Validator/useValidator';
import InputField from '../../shared-components/InputField';
import { tollEntryValidations } from './tollEntryValidations';
import { addTollEntry } from './store/tollEntrySlice';

const AddTollEntries = ({setPopUp}) => {
  const tollGateList = useSelector((state) => state.tollGate?.tollGateList)
  const tollEntriesList = useSelector((state) => state.tollEntry?.tollEntriesList)
  const dispatch = useDispatch()
  const {validator,errors} = useValidator(tollEntryValidations)
  const onSubmit = () => {
    console.log(entry)
    const isValid = validator(entry)
    if(isValid) {
      dispatch(addTollEntry({
        id: nanoid(5),
        entryDateTime: new Date().toISOString(),
        ...entry
      }
      ))
      setPopUp(false)
    }
  }
  const [entry, setEntry] = useState({})
  const handleTollNameChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value
    })
  }
  const handleVehicleTypeChange = (e) => {
    const currentTollGate = tollGateList.find(tollGate => tollGate.tollName === entry.tollName)
    const vehicleAlreadySelected = currentTollGate.tariff.find(data => data.vehicleType === e.target.value)
    console.log(vehicleAlreadySelected)
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
      tariff: vehicleAlreadySelected.singleJourney
    })
  }
  const handleVehicleNumberChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value
    })
    const existingVehicleEntry = tollEntriesList.find(tollEntry =>
      tollEntry.vehicleNumber === e.target.value
      && tollEntry.tollName === entry.tollName
      && tollEntry.vehicleType === entry.vehicleType
    )
    if (existingVehicleEntry) {
      const currentTime = new Date()
      let minutes = (currentTime - new Date(existingVehicleEntry.entryDateTime)) / (1000 * 60);
      console.log(minutes)
      if (minutes < 60) {
        const currentTollGate = tollGateList.find(tollGate => tollGate.tollName === entry.tollName)
        const vehicleAlreadySelected = currentTollGate.tariff.find(data => data.vehicleType === entry.vehicleType)
        console.log("changes tariff since return within 1 hour")
        setEntry({
          ...entry,
          [e.target.name]: e.target.value,
          tariff: vehicleAlreadySelected.returnJourney
        })
      }
    }
  }
  
  const [tollDropDownList, setTollDropDownList] = useState([])
  useEffect(() => {
    const tollList = tollGateList.map(tollgate => { return { value: tollgate.tollName, label: tollgate.tollName } })
    setTollDropDownList(tollList)
  }, [tollGateList])
  const vehicleDropdown = [
    { value: 1, label: "Car/Jeep/Van" },
    { value: 2, label: "LCV" },
    { value: 3, label: "Truck/Bus" },
    { value: 4, label: "Heavy vehicle" }
  ]

  return (
    <>
      <Dropdown
        data={tollDropDownList}
        value={entry.tollName || ''}
        label='Toll Name'
        placeholder='Select toll name'
        name={"tollName"}
        onChange={handleTollNameChange}
        error={errors.tollName}
      />
      <Dropdown
        data={vehicleDropdown}
        value={entry.vehicleType || ''}
        label="Select Vehicle"
        placeholder='Select Vehicle'
        name={"vehicleType"}
        onChange={handleVehicleTypeChange}
        error={errors.vehicleType}
      />
      <InputField
        value={entry.vehicleNumber || ''}
        type='text'
        label="Vehicle Number"
        placeholder='Enter vehicle number'
        onChange={handleVehicleNumberChange}
        name={"vehicleNumber"}
        error={errors.vehicleNumber} />

      <InputField
        value={entry.tariff || ''}
        type='text'
        label="Tariff"
        placeholder=''
        error={errors.tariff}
        disabled
      />
      <Button
        id={"btnClose"}
        type={"Submit"}
        value={"Submit"}
        isDisabled={false}
        clickHandler={onSubmit}
      />
    </>
  )
}

export default AddTollEntries