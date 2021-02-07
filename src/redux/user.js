import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading:true
}

const slice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.loading = false
    },
    setPhone: (state, action) => {state.phone = action.payload},
    setLocation: (state, action) => {state.location = action.payload},
  }
})
export const {
  setUser,
  setPhone,
  setLocation,
} = slice.actions
export default slice.reducer
