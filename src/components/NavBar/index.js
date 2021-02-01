import IconFont from "@/iconfont";
import {BOTTOM_GAP} from "@/utils/Const";
import {Image, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import {useSelector} from "react-redux";
import backIcon from '@/img/fanhui.png'
import homeIcon from '@/img/nav-home.png'
import './index.less'

export default function ({title = '', fixed = true, home = false, back = false, backUrl, children, viewBackGround = ''}) {

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect

  function _back() {
    if (backUrl) {
      Taro.navigateTo({url: backUrl}).catch(() => Taro.switchTab({url: backUrl}))
    } else {
      Taro.navigateBack()
    }
  }

  function _home() {
    Taro.switchTab({
      url: '/pages/index/index',
    })
  }

  return <View className='nav-container'>
    <View className='nav-warp' style={{height: `${bottom + BOTTOM_GAP}px`}} hidden={!fixed} />
    <View className={`nav-con ${fixed && 'nav-fixed'}`} style={{height: `${bottom + BOTTOM_GAP}px`}}>
      <View className='nav' style={{height: `${height + BOTTOM_GAP}px`}}>
        <View className={`${(home || back) && 'icon card'}`}
          style={{width: `${width}px`, marginLeft: `calc(100% - ${right}px)`, height: `${height}px`}}
        >
          {(home || back) && <View className='button' onClick={_back}>
            <IconFont name='return' size={30} color='#3C475D' />
          </View>}
          {(home || back) && <View className='line' />}
          {(home || back) && <View className='button' onClick={_home}>
            <IconFont name='home' size={30} color='#3C475D' />
          </View>}
        </View>
        <View className='title' style={{width: `${right - width * 2}px`, height: `${height}px`}}>
          <Text>{title}</Text>
        </View>
      </View>
    </View>
    <View className='view-container'
      style={{height: `calc(100vh - ${BOTTOM_GAP}px - ${bottom}px)`, backgroundColor: viewBackGround}}
      hidden={!fixed}
    >
      {children}
    </View>
  </View>
}
