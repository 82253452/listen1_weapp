import {combineReducers} from 'redux'
import user from "./user";
import theme from "./theme";
import music from "./music";

export default combineReducers({
  user,
  theme,
  music,
})
