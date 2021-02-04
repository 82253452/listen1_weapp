import {
  ADD_CONNECT,
  ADD_FAVORITE,
  ADD_PLAY,
  PLAY,
  PLAY_LATEST,
  SET_AUDIO_CONTEXT, SET_GOODS_LIST, SET_HOT_LIST,
  SET_PLAY_INDEX,
  SET_PLAY_LIST, SET_PLAYER_PAUSE, SET_SWIPER_LIST
} from "@/constants/music";

export const play = (state) => {
  return {
    type: PLAY,
    state
  }
}

export const playLatest = (state) => {
  return {
    type: PLAY_LATEST,
    state
  }
}
export const playIndex = (state) => {
  return {
    type: SET_PLAY_INDEX,
    state
  }
}
export const setAudioContext = (state) => {
  return {
    type: SET_AUDIO_CONTEXT,
    state
  }
}
export const setPlayList = (state) => {
  return {
    type: SET_PLAY_LIST,
    state
  }
}
export const addPlayer = (state) => {
  return {
    type: ADD_PLAY,
    state
  }
}
export const addConnect = (state) => {
  return {
    type: ADD_CONNECT,
    state
  }
}
export const addFavorite = (state) => {
  return {
    type: ADD_FAVORITE,
    state
  }
}
export const setWiperList = (state) => {
  return {
    type: SET_SWIPER_LIST,
    state
  }
}
export const setGoodsList = (state) => {
  return {
    type: SET_GOODS_LIST,
    state
  }
}
export const setHotList = (state) => {
  return {
    type: SET_HOT_LIST,
    state
  }
}
export const setPlayerPause = (state) => {
  return {
    type: SET_PLAYER_PAUSE,
    state
  }
}
export const addPlayerAsync = (state) => {
  return (dispatch, getState) => {
    const {playList, playIndex: pIndex, play: playS} = getState().music
    const i = playList.findIndex(r => state.id === r.id)
    if (i === pIndex) {
      dispatch(play(!playS))
      return
    }
    if (i !== -1) {
      dispatch(playIndex(i))
      return
    }
    dispatch(addPlayer(state))
    dispatch(playLatest())
  }
}

export const addPlayerAllAsync = (state) => {
  return (dispatch, getState) => {
    dispatch(addPlayer(state))
    dispatch(playIndex(0))
  }
}
