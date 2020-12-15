import {SET_LOCATION, SET_PHONE, SET_USER} from "@/constants/user";

const INITIAL_STATE = {
  loading:true
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.state,
        loading:false
      }
    case SET_PHONE:
      return {
        ...state,
        phone: action.state
      }
    case SET_LOCATION:
      return {
        ...state,
        currentLocation: action.state
      }
    default:
      return state
  }
}
