import {PLAY_LIST, PLAY_LIST_HOT, PLAY_RECOMMEND, PLAY_SONG_URL} from "@/api";
import rootReducer from '@/redux/index'
import {setAudioContext, setGoodsList, setHotList, setPlayerPause, setWiperList} from "@/redux/music";
import {setBoundingClientRect, setViewHeight, setWindowHeight, setWindowWidth} from "@/redux/theme";
import {BOTTOM_GAP} from "@/utils/Const";
import useEffectOnece from "@/utils/hook/useEffectOnece";
import {request} from "@/utils/request";
import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import Taro from "@tarojs/taro";
import React from 'react'
import {Provider} from 'react-redux'
import {persistReducer, persistStore} from "redux-persist";
import {PersistGate} from 'redux-persist/lib/integration/react';
import './app.less';
import storage from './redux/taroPersist'


const persistConfig = {
  key: 'app',
  storage,
  blacklist: ['music.play']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

const persistor = persistStore(store)


export default function ({children}) {

  function initAudioContext() {
    const audioContext = Taro.createInnerAudioContext()
    audioContext.onPlay(() => {
      setTimeout(() => {
        console.log(audioContext.paused)
      }, 100)
      console.log('start')
    })
    store.dispatch(setAudioContext(audioContext))
    store.dispatch(setPlayerPause())
    const {playList, playIndex} = store.getState().music
    playList.length && request(PLAY_SONG_URL, {id: playList[playIndex].id}).then(r => {
      const u = r.data[0].url
      audioContext.src = u
    })
    return audioContext;
  }

  useEffectOnece(() => {
    const boundingClientRect = Taro.getMenuButtonBoundingClientRect();
    store.dispatch(setBoundingClientRect(boundingClientRect))
    const {windowHeight, windowWidth} = Taro.getSystemInfoSync();
    store.dispatch(setWindowHeight(windowHeight))
    store.dispatch(setWindowWidth(windowWidth))
    store.dispatch(setViewHeight(windowHeight - boundingClientRect.bottom - BOTTOM_GAP))
    const audioContext = initAudioContext();
    initData()
    return () => audioContext.destroy()
  })

  function initData() {
    store.getState().music.swiperList.length || request(PLAY_RECOMMEND, {limit: 10}).then(r => {
      store.dispatch(setWiperList(r.result))
    })
    store.getState().music.playGoodList.length || request(PLAY_LIST, {limit: 6}).then(r => {
      store.dispatch(setGoodsList(r.playlists))
    })
    store.getState().music.playHotList.length || request(PLAY_LIST_HOT, {limit: 6}).then(r => {
      store.dispatch(setHotList(r.playlists))
    })
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>

    </Provider>
  )
}
