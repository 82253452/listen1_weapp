import {CAR_RENTAL_LIST} from "@/api";
import NavBar from "@/components/NavBar";
import gengduo from '@/img/gengduo@2x.png'
import shangcheng from '@/img/shangcheng@2x.png'
import {BOTTOM_GAP} from "@/utils/Const";
import useScrollPage from "@/utils/hook/useScrollPage";
import {Image, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React from 'react'
import {useSelector} from "react-redux";
import './index.less'

const statusList = {
  0: '未生效',
  1: '生效中',
  2: '失效',
  3: '暂停',
  4: '异常',
}

export default function () {

  const user = useSelector(state => state.user)
  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect

  console.log('user', user)

  const {data = []} = useScrollPage(CAR_RENTAL_LIST, {}, false)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/detail/index?id=${id}`})
  }

  function userAuth() {
    user.id || Taro.navigateTo({url: '/pages/authorize/index'})
  }

  function toRental() {
    Taro.navigateTo({url: '/pages/rental/index'})
  }

  return (
    <NavBar title='平租车'>
      <View className='index'>
        {!user.loading ? (user.id ? (data.length ? data.map(d => <View className='block' onClick={() => toDetail(d.id)}>
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
            <View className='img_view'>
              <Image className='img' src={d.carImg?.split(',')[0]} />
            </View>
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
        </View>) : <View className='index_center' style={{height: `calc(100vh - ${bottom}px - ${BOTTOM_GAP}px)`}}
          onClick={toRental}
        >
          <View className='button'>申请租车</View>
        </View>) : <View className='index_center' style={{height: `calc(100vh - ${bottom}px - ${BOTTOM_GAP}px)`}}
          onClick={userAuth}
        >
          <View className='button'>登录</View>
        </View>) : <View />}
      </View>
    </NavBar>
  )
}

