import {PLAY_SONG_URL} from "@/api";
import {request} from "@/utils/request";
import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  audioContext: null,
  isPush: false,
  play: false,//是否播放音乐
  playList: [],//播放音乐列表
  playIndex: 0,//当前播放第几个
  connect: [],//收藏歌单
  favorite: [],//喜欢歌曲
  swiperList: [],
  playGoodList: [],
  playHotList: []
}

const slice = createSlice({
  name: 'music',
  initialState: INITIAL_STATE,
  reducers: {
    setIsPush: (state, action) => {
      state.isPush = action.payload
    },
    setPlay: (state, action) => {
      state.play = action.payload
      action.payload ? state.audioContext.play() : state.audioContext.pause()
    },
    setAudioSrc: (state, action) => {
      state.audioContext.src = action.payload
      state.audioContext.play()
    },
    setPlayIndex: (state, action) => {
      state.playIndex = action.payload
    },
    setAudioContext: (state, action) => {
      state.audioContext = action.payload
    },
    setPlayList: (state, action) => {
      state.playList = action.payload
    },
    addPlayer: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.playList = action.payload
      } else {
        state.playList.some(l => l.id === action.payload.id) || state.playList.push(action.payload)
      }
    },
    addConnect: (state, action) => {
      const flag = state.connect.some(c => c.id === action.state.id)
      flag ? state.connect = state.connect.filter(l => l.id !== action.payload.id) : state.connect = [...state.connect, action.payload]
    },
    addFavorite: (state, action) => {
      const flag = state.favorite.some(c => c.id === action.payload.id)
      flag ? state.favorite = state.favorite.filter(l => l.id !== action.payload.id) : state.favorite = [...state.connect, action.payload]
    },
    setWiperList: (state, action) => {
      state.swiperList = action.payload
    },
    setGoodsList: (state, action) => {
      state.playGoodList = action.payload
    },
    setHotList: (state, action) => {
      state.playHotList = action.payload
    },
    setPlayerPause: state => {
      state.play = false
      state.audioContext.pause()
    },
  }
})
export const {
  setPlay,
  setAudioSrc,
  setPlayIndex,
  setAudioContext,
  setPlayList,
  addPlayer,
  addConnect,
  addFavorite,
  setWiperList,
  setGoodsList,
  setHotList,
  setPlayerPause,
  setIsPush
} = slice.actions
export default slice.reducer

export const playLatest = () => async (dispatch, getState) => {
  const {playList, playIndex, play} = getState().music
  play || dispatch(setPlay(true))
  const url = await request(PLAY_SONG_URL, {id: playList[playIndex].id}).then(r => r.data[0].url)
  dispatch(setAudioSrc(url))
}

export const playerIndex = (i) => async (dispatch, getState) => {
  const {playList, play} = getState().music
  dispatch(setPlayIndex(i))
  play || dispatch(setPlay(true))
  const url = await request(PLAY_SONG_URL, {id: playList[i].id}).then(r => r.data[0].url)
  dispatch(setAudioSrc(url))
}

export const addPlayerAsync = (track) => async (dispatch, getState) => {
  const {playList, playIndex: pIndex, play: playS} = getState().music
  playS || dispatch(setPlay(true))
  const i = playList.findIndex(r => track.id === r.id)
  if (i === pIndex) {
    dispatch(setPlay(!playS))
    return
  }
  if (i !== -1) {
    dispatch(setPlayIndex(i))
    const url = await request(PLAY_SONG_URL, {id: track.id}).then(r => r.data[0].url)
    dispatch(setAudioSrc(url))
    return
  }
  dispatch(addPlayer(track))
  dispatch(playLatest())
}

export const addPlayerAllAsync = (tracks) => async (dispatch, getState) => {
  dispatch(addPlayer(tracks))
  dispatch(setPlayIndex(0))
  const {play} = getState().music
  play || dispatch(setPlay(true))
  const url = await request(PLAY_SONG_URL, {id: tracks[0].id}).then(r => r.data[0].url)
  dispatch(setAudioSrc(url))
}

