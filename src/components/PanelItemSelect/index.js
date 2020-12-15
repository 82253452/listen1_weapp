import {Image, Picker, Text, View} from "@tarojs/components";
import React from "react";
import gengduo from '@/img/gengduo.png'
import jiantou from '@/img/jiantou.png'


import './index.less'

export default function ({title, placeHolder, style, onClick, range, value, onChange, mode = 'selector'}) {

  return <View className='panel-item-select-container'
    onClick={onClick}
    style={{...style}}
  >
    <View className='border-view'>
      <Text className='title'>{title}</Text>
      <View className='right'>
        {mode === 'date' && range &&
        <View style={{display: 'flex',alignItems:'center'}}>
          <Picker mode={mode} range={range} onChange={event => onChange && onChange(event.detail.value, 0)}>
            <Text
              className={value instanceof Array ? (value[0] ? 'text' : 'placeHolder') : (value ?'text' : 'placeHolder')}
            >{value instanceof Array ? (value[0] || placeHolder) : (value || placeHolder)}</Text>
          </Picker>
          <Image src={jiantou} style={{width: '39rpx', height: '17rpx',margin:'0 20rpx'}} />
        </View>}
        <Picker mode={mode} range={range} onChange={event => onChange && onChange(event.detail.value, 1)}>
          <Text
            className={value instanceof Array ? (value[1] ? 'text' : 'placeHolder') : (value ?'text' : 'placeHolder')}
          >{value instanceof Array ? (value[1] || placeHolder) : (value || placeHolder)}</Text>
        </Picker>
        <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} />
      </View>
    </View>
  </View>
}

