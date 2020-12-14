import {CAR_RENTAL_LIST} from "@/api";
import gengduo from '@/img/gengduo@2x.png'

import shangcheng from '@/img/shangcheng@2x.png'
import useScrollPage from "@/utils/hook/useScrollPage";
import {Image, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React from 'react'
import './index.less'

const statusList = {
  0: '未生效',
  1: '生效中',
  2: '失效',
  3: '暂停',
  4: '异常',
}

export default function () {

  const {data = []} = useScrollPage(CAR_RENTAL_LIST)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/detail/index?id=${id}`})
  }

  return (
    <View className='index'>
      {data.length ? data.map(d => <View className='block' onClick={()=>toDetail(d.id)}>
        <View className='header'>
          <View className='left'>
            <Image src={shangcheng} style={{width: '30rpx', height: '30rpx'}} />
            <Text>租车合同</Text>
          </View>
          <View className='right'>
            <Text>{statusList[d.status]}</Text>
            <Image src={gengduo} style={{width: '12rpx', height: '22rpx'}} />
          </View>
        </View>
        <View className='body'>
          <Image className='img' src={d.carImg.split(',')[0]} />
          <View className='content'>
            <View className='title'>
              {d.title}
            </View>
            <View className='desc'>
              时长:{d.leaseDuration}个月 车牌号:{d.carNumber}
            </View>
            <View className='price'>
              ￥{d.deposit}
            </View>
          </View>
        </View>
      </View>) : <View />}
    </View>
  )
}

