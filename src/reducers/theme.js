import {SET_BOUNDING_CLIENT_RECT, SET_TABBAR_HEIGHT, SET_VIEW_HEIGHT, SET_WINDOW_HEIGHT} from "@/constants/theme";

const INITIAL_STATE = {
  boundingClientRect: {},
  viewHeight: 0,
  windowHeight: 0,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_BOUNDING_CLIENT_RECT:
      return {
        ...state,
        boundingClientRect: action.state,
      }
    case SET_WINDOW_HEIGHT:
      return {
        ...state,
        windowHeight: action.state,
      }
    case SET_VIEW_HEIGHT:
      return {
        ...state,
        viewHeight: action.state,
      }
    case SET_TABBAR_HEIGHT:
      return {
        ...state,
        tabBarHeight: action.state,
      }
    default:
      return state
  }
}
