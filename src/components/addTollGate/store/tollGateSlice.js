import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tollGateList: []

}

export const tollGateSlice = createSlice({
  name: 'tollGate',
  initialState,
  reducers: {
    addTollGate: (state, action) => {
      const {tollName, tariff} = action.payload
      const tollGate = state.tollGateList.find(tollGate => tollGate.tollName === tollName)
      if(tollGate) {
        let existingTariff = tollGate.tariff.find(storedTariff => storedTariff.vehicleType === tariff.vehicleType)
        // console.log(tollGate.tariff)
        if(existingTariff) {
          existingTariff = tariff
        }
        else{
          tollGate.tariff= [...tollGate.tariff,...tariff]
        }
      }else {
        state.tollGateList.push(action.payload)
      }
    },
  },
})

export const { addTollGate } = tollGateSlice.actions

export default tollGateSlice.reducer