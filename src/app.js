import {setAudioContext, setGoodsList, setHotList, setPlayerPause, setWiperList} from "@/actions/music";
import {setBoundingClientRect, setViewHeight, setWindowHeight, setWindowWidth} from "@/actions/theme";
import {PLAY_LIST, PLAY_LIST_HOT, PLAY_RECOMMEND} from "@/api";
import configStore from '@/store'
import {BOTTOM_GAP} from "@/utils/Const";
import useEffectOnece from "@/utils/hook/useEffectOnece";
import {request} from "@/utils/request";
import Taro from "@tarojs/taro";
import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react';
import './app.less'

const {store, persistor} = configStore()


export default function ({children}) {


  useEffectOnece(() => {
    const boundingClientRect = Taro.getMenuButtonBoundingClientRect();
    store.dispatch(setBoundingClientRect(boundingClientRect))
    const {windowHeight, windowWidth} = Taro.getSystemInfoSync();
    store.dispatch(setWindowHeight(windowHeight))
    store.dispatch(setWindowWidth(windowWidth))
    store.dispatch(setViewHeight(windowHeight - boundingClientRect.bottom - BOTTOM_GAP))
    const audioContext = Taro.createInnerAudioContext()
    audioContext.onPlay(() => {
      setTimeout(() => {
        console.log(audioContext.paused)
      }, 100)
      console.log('start')
    })
    store.dispatch(setAudioContext(audioContext))
    store.dispatch(setPlayerPause())
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
