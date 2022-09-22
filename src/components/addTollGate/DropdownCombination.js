import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../shared-components/Button';
import Dropdown from '../../shared-components/Dropdown';
import { useValidator } from '../../shared-components/Validator/useValidator';
import InputField from '../../shared-components/InputField';
import { tollGateValidations } from './tollGateValidations';
import { addTollGate } from './store/tollGateSlice';

const DropdownCombination = ({ tollName, vehicleDropdown }) => {
  const dispatch = useDispatch()
  const tollGateList = useSelector(state => state.tollGate.tollGateList)
  const [dropdown, setDropDown] = useState([]);
  useEffect(() => {
    const currentTollGate = tollGateList.find(tollGate => tollGate.tollName === tollName)
    if (currentTollGate) {
      const vehicleAlreadySelected = currentTollGate.tariff.map(data => data.vehicleType)
      const dropdownTemp = vehicleDropdown.filter(vehicle => !vehicleAlreadySelected.includes(vehicle.value.toString()))
      setDropDown(dropdownTemp)
      console.log(tollName)
      console.log(dropdownTemp)
    }
  }, [tollGateList, vehicleDropdown, tollName])

  useEffect(() => {
    if(dropdown.length === 0) {
      setDropDown(vehicleDropdown)
    }
  }, [vehicleDropdown,dropdown])
  const [tariffData, setTariffData] = useState(
    {
      vehicleType: "",
      singleJourney: "",
      returnJourney: ""
    }

  )
  const [disable, setDisable] = useState(false)

  const vehicleTypeChangeHandle = (e) => {
    setTariffData({
      ...tariffData,

      [e.target.name]: e.target.value

    })
  }
  const handleJourneyPrice = (e) => {
    setTariffData({
      ...tariffData,
      [e.target.name]: e.target.value

    })
  }
  const {validator,errors} = useValidator(tollGateValidations)
  const onSubmit = () => {
    console.log(tariffData)
    const isValid = validator(tariffData)
    console.log(isValid)
    console.log(errors)
    if (isValid) {
      dispatch(addTollGate({ tollName, tariff: [{...tariffData, fromAndTo:tariffData.singleJourney + "/" + tariffData.returnJourney }] }))
      setDisable(true)
    }
  }
  
  return (
    <div>
      {!disable ? <Dropdown
        data={dropdown}
        value={tariffData.vehicleType || ''}
        label='vehicleType'
        placeholder='Select vehicleType'
        onChange={vehicleTypeChangeHandle}
        name="vehicleType"
        disabled={disable}
        error={errors.vehicleType}
      /> :
        <InputField
          value={vehicleDropdown.find(vehicle => vehicle.value.toString() === tariffData.vehicleType ).label || ''}
          label='vehicleType'
          placeholder='Select vehicleType'
          type='text'
          name="singleJourney"
          disabled={disable}
        />
      }
      <InputField
        value={tariffData.singleJourney || ''}
        type='text'
        label="Single Journey"
        placeholder='Enter single amount'
        onChange={handleJourneyPrice}
        name="singleJourney"
        disabled={disable}
        error={errors.singleJourney}
      />

      <InputField
        value={tariffData.returnJourney || ''}
        type='text'
        label="Return Journey"
        placeholder='Enter return amount'
        onChange={handleJourneyPrice}
        name="returnJourney"
        disabled={disable}
        error={errors.returnJourney}
      />


      {!disable && <Button
        id={"btnClose"}
        type={"Submit"}
        value={"OK"}
        isDisabled={disable}
        clickHandler={onSubmit}
      />
      }
    </div>
  )
}

export default DropdownCombination