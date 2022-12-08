import { createSlice } from '@reduxjs/toolkit'

export interface lightDarkState {
  value: boolean
}

const initialState: lightDarkState = {
  value: true,
}

export const lightDarkSlice = createSlice({
  name: 'lightDark',
  initialState,
  reducers: {
    changeLightDark: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLightDark } = lightDarkSlice.actions

export default lightDarkSlice.reducer