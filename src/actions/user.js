import {SET_LOCATION, SET_PHONE, SET_USER} from "@/constants/user";

export const setUser = (state) => {
  return {
    type: SET_USER,
    state
  }
}
export const setPhone = (state) => {
  return {
    type: SET_PHONE,
    state
  }
}
export const setLocation = (state) => {
  return {
    type: SET_LOCATION,
    state
  }
}
