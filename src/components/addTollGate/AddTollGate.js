import React, { useState } from 'react'
import Button from '../../shared-components/Button'
import { useValidator } from '../../shared-components/Validator/useValidator'
import InputField from '../../shared-components/InputField'
import { tollGateEntryValidations } from './tollGateEntryValidations'
import DropdownCombination from './DropdownCombination'

const AddTollGate = ({setPopUp}) => {
  const vehicleDropdown = [
    { value: 1, label: "Car/Jeep/Van" },
    { value: 2, label: "LCV" },
    { value: 3, label: "Truck/Bus" },
    { value: 4, label: "Heavy vehicle" }
  ]
  const [tariffData, setTariffData] = useState({})
  const tollNameChangeHandle = (e) => {
    setTariffData({
      ...tariffData,
      [e.target.name]: e.target.value
    })
  }
  const {validator,errors} = useValidator(tollGateEntryValidations)
  const onSubmit = () => {
    setPopUp(false)
  }
  const [disableName, setDisableName] = useState(false)
  const onTollNameSubmit = () => {
    const isValid = validator(tariffData)
    if (isValid) {
      setDisableName(true)
    }
  }
  return (
    <>
      <div>
        <InputField
          value={tariffData.tollName || ''}
          type='text'
          label="Toll Name"
          placeholder='Tollname'
          onChange={tollNameChangeHandle}
          name="tollName"
          disabled={disableName}
          error={errors.tollName}
        />
        {!disableName && <Button
          id={"btnClose"}
          type={"Submit"}
          value={"Tollname Submit"}
          isDisabled={false}
          clickHandler={onTollNameSubmit}
        />
        }
      </div>

      {disableName && vehicleDropdown && vehicleDropdown.map(vehicle => {

        return <DropdownCombination tollName={tariffData.tollName} key={vehicle.label} vehicleDropdown={vehicleDropdown} />
      })}
      <div>
        {disableName && <Button
          id={"btnClose"}
          type={"Submit"}
          value={"End"}
          isDisabled={false}
          clickHandler={onSubmit}
        />}
      </div>
    </>
  )
}

export default AddTollGate