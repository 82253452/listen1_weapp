import IconFont from "@/iconfont";
import {MovableView, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";

import './index.less'

export default function () {


  const {viewHeight, widowWidth} = useSelector(state => state.theme)

  function toPlayer() {
    Taro.navigateTo({url: `/pages/player/index`})
  }

  const {playList,play} = useSelector(state => state.music)

  const t = useMemo(()=>!!playList.length,[playList])

  return t ? <MovableView className='move-view-button' direction='all' y={viewHeight - 50} x={widowWidth - 100}
    onClick={toPlayer}
  >
    <View className={`${play?'view_rotate':''}`}>
      <View className='icon_view'><IconFont name='yinle' size={100} color='#3C475D' /></View>
    </View>
  </MovableView> : <View />
}
