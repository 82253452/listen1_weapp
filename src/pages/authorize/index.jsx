import NavBar from "@/components/NavBar";
import {useGetUserInfo} from "@/utils/wx";
import {Button, Image, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from "react";
import logo from '@/img/agerenzhongxin.png'

import './index.less'

export default function Index() {

  const authorize = useGetUserInfo()

  return (
    <NavBar title='授权登录' back home>
      <View className='wrap'>
        <View className='logo'>
          <Image src={logo} className='chatu' />
          <View className='title'>CAR</View>
        </View>
        <View className='info'>
          <View className='fs_30'>请允许我们获取以下权限：</View>
          <View className='fs_26'>以下信息仅用于您登录小程序，我们将严格保密绝不外泄</View>
          <View className='fs_30'>公开信息（头像、昵称）</View>
        </View>
        <Button openType='getUserInfo' onGetUserInfo={authorize} className='authorize_btn'>点击授权</Button>
        <Button className='authorize_btn' style='background:#EBEBEB;margin-top:30rpx;color:#D3D3D3' onClick={() => {
          Taro.navigateBack()
        }}
        >取消授权</Button>
      </View>
    </NavBar>
  )
}
