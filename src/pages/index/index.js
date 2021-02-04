import {PLAY_LIST, PLAY_LIST_HOT, PLAY_RECOMMEND} from "@/api";
import Player from "@/components/Player";
import IconFont from "@/iconfont";
import {BOTTOM_GAP} from "@/utils/Const";
import useQuery from "@/utils/hook/useQuery";
import {Image, MovableArea, Swiper, SwiperItem, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {useState} from 'react'
import {useSelector} from "react-redux";
import './index.less'


export default function () {


  console.log('index')

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect


  return (
    <MovableArea className='container_filter'>
      <View className='header' style={{
        height: `${bottom + BOTTOM_GAP}px`,
        paddingLeft: `calc(100% - ${right}px)`,
        paddingBottom: `${BOTTOM_GAP}px`
      }}
      >
        <View className='title' style={{height: `${height}px`, width: `${width}px`}}>Listen1</View>
      </View>
      <Swipers />
      <Coonect />
      <PlayList />
      <PlayHotList />
      <Player />
    </MovableArea>
  )
}

function PlayList() {
  const {playGoodList} = useSelector(state => state.music)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }

  function toClass() {
    Taro.navigateTo({url: `/pages/PlayListClass/index?url=${PLAY_LIST}`})
  }

  return <View className='play_list'>
    <View className='name'>
      <View>精品歌单</View>
      <View className='more card' onClick={toClass}>
        <IconFont name='youjiantou-' size={24} />
      </View>
    </View>
    <View className='block_view'>
      {playGoodList?.map(l => <View className='block card' onClick={() => toDetail(l.id)}>
        <Image src={l.coverImgUrl} />
        {l.name}</View>)}
    </View>
  </View>
}

function PlayHotList() {
  const {playHotList} = useSelector(state => state.music)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }

  function toClass() {
    Taro.navigateTo({url: `/pages/PlayListClass/index?url=${PLAY_LIST_HOT}`})
  }

  return <View className='play_list'>
    <View className='name'>
      <View>网友精选</View>
      <View className='more card' onClick={toClass}>
        <IconFont name='youjiantou-' size={24} />
      </View>
    </View>
    <View className='block_view'>
      {playHotList?.map(l => <View className='block card' onClick={() => toDetail(l.id)}>
        <Image src={l.coverImgUrl} />
        {l.name}</View>)}
    </View>
  </View>
}

function Coonect() {


  const {connect} = useSelector(state => state.music)

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }

  function toClass() {
    Taro.navigateTo({url: `/pages/PlayListConnect/index`})
  }

  return connect.length?<View className='play_list'>
    <View className='name'>
      <View>收藏歌单</View>
      <View className='more card' onClick={toClass}>
        <IconFont name='youjiantou-' size={24} />
      </View>
    </View>
    <View className='block_view'>
      {connect?.filter((l,i)=>i<6).map(l => <View className='block card' onClick={() => toDetail(l.id)}>
        <Image src={l.img} />
        {l.name}</View>)}
    </View>
  </View>:null
}

function Swipers() {
  const [pIndex, setPIndex] = useState(4)
  const {swiperList} = useSelector(state => state.music)

  function swiperChange(d) {
    setPIndex(d.detail.current)
  }
  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }


  return <Swiper
    className='swiper'
    previousMargin='100rpx'
    nextMargin='100rpx'
    current={pIndex}
    onChange={swiperChange}
  >
    {swiperList?.map((l, i) => <SwiperItem className='swiper_item' onClick={()=>toDetail(l.id)}>
      <View className={`img_view card ${i === pIndex ? 'flex_top' : 'flex_bottom'}`}>
        <Image className='img' src={l.picUrl} />
      </View>
    </SwiperItem>)}
  </Swiper>
}



