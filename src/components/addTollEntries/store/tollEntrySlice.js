import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tollEntriesList: [],
}

export const tollEntrySlice = createSlice({
  name: 'tollEntry',
  initialState,
  reducers: {
    addTollEntry: (state,action) => {
      state.tollEntriesList.push(action.payload)
    },
  },
})

export const { addTollEntry } = tollEntrySlice.actions

export default tollEntrySlice.reducer