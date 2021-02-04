import {
  SET_BOUNDING_CLIENT_RECT,
  SET_TABBAR_HEIGHT,
  SET_VIEW_HEIGHT,
  SET_WINDOW_HEIGHT,
  SET_WINDOW_WIDTH
} from "@/constants/theme";

export const setBoundingClientRect = (state) => {
  return {
    type: SET_BOUNDING_CLIENT_RECT,
    state
  }
}

export const setWindowHeight = (state) => {
  return {
    type: SET_WINDOW_HEIGHT,
    state
  }
}
export const setWindowWidth = (state) => {
  return {
    type: SET_WINDOW_WIDTH,
    state
  }
}
export const setViewHeight = (state) => {
  return {
    type: SET_VIEW_HEIGHT,
    state
  }
}
export const setTabBarHeight = (state) => {
  return {
    type: SET_TABBAR_HEIGHT,
    state
  }
}
