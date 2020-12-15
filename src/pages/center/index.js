import {setUser} from "@/actions/user";
import Panel from '@/components/Panel'
import avatar from '@/img/agerenzhongxin.png'
import bangzhu from '@/img/bangzhu.png'
import dingdan2 from '@/img/dingdan2.png'
import dizhibo from '@/img/dizhibo.png'
import jianyi from '@/img/jianyi.png'
import kefu from '@/img/kefu.png'
import qianbao from '@/img/qianbao.png'
import xinyu from '@/img/xinyu.png'

import {BOTTOM_GAP} from "@/utils/Const";
import {getUserInfo} from "@/utils/request";
import {Button, Image, Text, View} from "@tarojs/components";
import {useDidShow} from "@tarojs/runtime";
import Taro from '@tarojs/taro'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import './index.less'

export default function () {
  console.log('center')

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  function userAuth() {
    Taro.navigateTo({url: '/pages/authorize/index'})
  }

  useDidShow(() => {
    getUserInfo().then(res => {
      dispatch(setUser(res))
    })
  })


  return <View className='container'>
    <View className='user-info' style={{paddingTop: `${bottom + BOTTOM_GAP}px`}}>
      <View className='info' onClick={userAuth}>
        <Image className='avatar' src={user.avatarurl || avatar} />
        <View className='user'>
          <Text className='nick_name'>{user.nickname || '登录'}</Text>
          <View className='integral'>
            <Image src={xinyu} style={{width: '26rpx', height: '34rpx'}} />
            <Text>信誉：{user.creditScore || 0}</Text>
          </View>
        </View>
      </View>
    </View>
    <Header />
    <Items />
  </View>
}

function Header() {
  const user = useSelector(state => state.user)

  function toOrder() {
    Taro.switchTab({url: '/pages/index/index'})
  }

  function money() {
    Taro.showModal({
      title: '押金', content: `
        押金0元
    `, showCancel: false
    })
  }
  function toRental(){
    Taro.navigateTo({url: '/pages/rental/index'})
  }

  return <Panel style={{marginTop: '-45rpx', padding: '40rpx 0'}}>
    <View className='header_nav'>
      <View className='item' onClick={toOrder}>
        <Image src={dingdan2} style={{width: '76rpx', height: '82rpx'}} />
        <Text>我的合同</Text>
      </View>
      <View className='item'>
        <Image src={dizhibo} style={{width: '76rpx', height: '82rpx'}} onClick={toRental} />
        <Text>申请租车</Text>
      </View>
      <View className='item'>
        <Image src={qianbao} style={{width: '76rpx', height: '82rpx'}} onClick={money} />
        <Text>押金</Text>
      </View>
    </View>
  </Panel>
}

function Items() {

  function makeCall() {
    Taro.makePhoneCall({phoneNumber: '15901320019'})
  }

  return <Panel style={{borderRadius: '0', padding: '30rpx 0 0 0', width: '100%'}}>
    <View className='items_list'>
      <View className='header'>
        <View className='line' />
        <View className='text'>其他功能</View>
      </View>
      <View className='item'>
        <View className='block border_bottom'>
          <Image src={bangzhu} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>帮助中心</View>
            <View className='desc'>常见问题快速解决</View>
          </View>
        </View>
        <Button openType='feedback' className='block border_bottom content'>
          <Image src={jianyi} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <Text className='title' style={{lineHeight: '38rpx'}}>建议反馈</Text>
            <Text className='desc' style={{lineHeight: '38rpx'}}>服务建议反馈</Text>
          </View>
        </Button>
        <View className='block' onClick={makeCall}>
          <Image src={kefu} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>客服</View>
            <View className='desc'>服务时间8点-21点</View>
          </View>
        </View>
        <View className='block center'>
          <Button openType='share' className='content block_button'>
            邀请有奖
          </Button>
        </View>
      </View>
    </View>
  </Panel>
}
