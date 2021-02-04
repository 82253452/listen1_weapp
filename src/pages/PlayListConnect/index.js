import NavBar from "@/components/NavBar";
import {Image, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import {useSelector} from "react-redux";
import './index.less'


export default function () {

  console.log('PlayListConnect')

  return (
    <NavBar title='Listen1' back>
      <View className='container_filter'>
        <PlayList />
      </View>
    </NavBar>
  )
}

function PlayList() {
  const {connect} = useSelector(state => state.music)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }

  return <View className='play_list'>
    <View className='block_view'>
      {connect?.map(l => <View className='block card' onClick={() => toDetail(l.id)}>
        <Image src={l.img} />
        {l.name}</View>)}
    </View>
  </View>
}

