import {PLAY_SONG_URL} from "@/api";
import {
  ADD_CONNECT, ADD_FAVORITE,
  ADD_PLAY,
  PLAY,
  PLAY_LATEST,
  SET_AUDIO_CONTEXT, SET_GOODS_LIST, SET_HOT_LIST,
  SET_PLAY_INDEX,
  SET_PLAY_LIST, SET_PLAYER_PAUSE, SET_SWIPER_LIST
} from "@/constants/music";
import {request} from "@/utils/request";

const INITIAL_STATE = {
  audioContext: null,
  play: false,//是否播放音乐
  playList: [],//播放音乐列表
  playIndex: 0,//当前播放第几个
  connect: [],//收藏歌单
  favorite: [],//喜欢歌曲
  swiperList: [],
  playGoodList:[],
  playHotList:[]
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PLAY: {
      request(PLAY_SONG_URL, {id: state.playList[state.playIndex].id}).then(r => {
        state.audioContext.src = r.data[0].url
        action.state ? state.audioContext.play() : state.audioContext.pause()
      })
      return {
        ...state,
        play: action.state,
      }
    }
    case ADD_CONNECT: {
      const flag = state.connect.some(c => c.id === action.state.id)
      return flag ? {
        ...state,
        connect: state.connect.filter(l => l.id !== action.state.id)
      } : {
        ...state,
        connect: [...state.connect, action.state],
      }
    }
    case ADD_FAVORITE: {
      const flag = state.favorite.some(c => c.id === action.state.id)
      return flag ? {
        ...state,
        favorite: state.favorite.filter(l => l.id !== action.state.id)
      } : {
        ...state,
        favorite: [...state.favorite, action.state],
      }
    }
    case PLAY_LATEST: {
      request(PLAY_SONG_URL, {id: state.playList[state.playIndex].id}).then(r => {
        state.audioContext.src = r.data[0].url
        state.audioContext.play()
      })
      return {
        ...state,
        playIndex: state.playList.length - 1,
        play: true,
      }
    }
    case SET_PLAYER_PAUSE: {
      state.audioContext&&state.audioContext.pause()
      return {
        ...state,
        play: false,
      }
    }
    case SET_PLAY_INDEX: {
      if (state.playList[action.state].url) {
        state.audioContext.src = state.playList[action.state].url
        state.audioContext.play()
      } else {
        request(PLAY_SONG_URL, {id: state.playList[action.state].id}).then(r => {
          state.audioContext.src = r.data[0].url
          state.audioContext.play()
        })
      }
      return {
        ...state,
        play: true,
        playIndex: action.state,
      }
    }
    case SET_AUDIO_CONTEXT:
      return {
        ...state,
        audioContext: action.state
      }
    case SET_PLAY_LIST:
      return {
        ...state,
        playList: action.state
      }
    case ADD_PLAY:
      return Array.isArray(action.state) ? {
        ...state,
        playList: action.state
      } : {
        ...state,
        playList: [...state.playList, action.state]
      }
    case SET_SWIPER_LIST:
      return {
        ...state,
        swiperList: action.state
      }
    case SET_GOODS_LIST:
      return {
        ...state,
        playGoodList: action.state
      }
    case SET_HOT_LIST:
      return {
        ...state,
        playHotList: action.state
      }
    default:
      return state
  }
}
