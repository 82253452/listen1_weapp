import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  boundingClientRect: {},
  viewHeight: 0,
  widowWidth: 0,
  windowHeight: 0,
}

const slice = createSlice({
  name: 'theme',
  initialState: INITIAL_STATE,
  reducers: {
    setBoundingClientRect: (state, action) => {
      state.boundingClientRect = action.payload
    },
    setViewHeight: (state, action) => {state.viewHeight = action.payload},
    setWindowWidth: (state, action) => {
      state.widowWidth = action.payload
    },
    setWindowHeight: (state, action) => {
      state.windowHeight = action.payload
    },
  }
})
export const {
  setViewHeight,
  setWindowWidth,
  setWindowHeight,
  setBoundingClientRect,
} = slice.actions
export default slice.reducer
