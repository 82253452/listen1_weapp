import {setBoundingClientRect, setViewHeight, setWindowHeight} from "@/actions/theme";
import {setLocation, setUser} from "@/actions/user";
import configStore from '@/store'
import {BOTTOM_GAP} from "@/utils/Const";
import useEffectOnece from "@/utils/hook/useEffectOnece";
import {getUserInfo} from "@/utils/request"
import Taro from "@tarojs/taro";
import React from 'react'
import {Provider} from 'react-redux'
import './app.less'

const store = configStore()


export default function ({children}) {


  useEffectOnece(() => {
    const boundingClientRect = Taro.getMenuButtonBoundingClientRect();
    store.dispatch(setBoundingClientRect(boundingClientRect))
    const {windowHeight} = Taro.getSystemInfoSync();
    store.dispatch(setWindowHeight(windowHeight))
    store.dispatch(setViewHeight(windowHeight - boundingClientRect.bottom - BOTTOM_GAP))
    getUserInfo().then(res => {
      store.dispatch(setUser(res))
    }).catch(()=>{
      store.dispatch(setUser({}))
    })
    // Taro.getLocation({type: 'wgs84'}).then(res => {
    //   store.dispatch(setLocation(res))
    // })
  })

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
