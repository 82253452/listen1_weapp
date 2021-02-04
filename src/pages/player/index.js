import {addFavorite, play, playIndex, setPlayList} from "@/actions/music";
import {PLAY_SONG_URL} from "@/api";
import NavBar from "@/components/NavBar";
import IconFont from "@/iconfont";
import useQuery from "@/utils/hook/useQuery";
import useUpdateEffect from "@/utils/hook/useUpdateEffect";
import {Image, Swiper, SwiperItem, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import './index.less'


export default function () {

  console.log('player')

  return (
    <NavBar title='Listen1' back>
      <View className='container'>
        <Player />
      </View>
    </NavBar>
  )
}

function Seek() {

  const {playIndex: pIndex, audioContext} = useSelector(state => state.music)

  const [timeIn, setTimeIn] = useState(0)

  useEffect(() => {
    audioContext.onTimeUpdate(() => {
      setTimeIn((audioContext.currentTime / audioContext.duration * 100).toFixed(2))
    })
    return () => {
      audioContext.offTimeUpdate()
    }
  }, [audioContext, pIndex])

  return <View className='seek_con'>
    <View className='seek card_n_strengthen'>
      <View className='seek_l' style={{width: `${timeIn}%`}} />
    </View>
  </View>
}

function Player() {

  const {playIndex: pIndex, playList, play: playState, favorite} = useSelector(state => state.music)
  const dispatch = useDispatch()
  const track = playList[pIndex]

  const favoriteState = favorite.some(f=>f.id===track.id)

  function onFavorite(){
    dispatch(addFavorite(track))
  }

  return <View>
    <Swipers />
    <View className='title'>{track.name}</View>
    <View className='like' onClick={onFavorite}>
      <IconFont name={`${favoriteState?'xihuan':'xihuan2'}`} size={50} />
    </View>
    <Seek />
    <View className='controls'>
      <View className='control card'>
        <IconFont name='shangyiqu' size={40} />
      </View>
      <View className={`control  ${playState ? 'card_n' : 'card'}`} onClick={() => dispatch(play(!playState))}>
        <IconFont name={`${playState ? 'pause' : 'bofang'}`} size={40} />
      </View>
      <View className='control card'>
        <IconFont name='xiayiqu' size={40} />
      </View>
    </View>
  </View>
}

function Swipers() {
  const {playList, playIndex: pIndex} = useSelector(state => state.music)
  const dispatch = useDispatch()

  function swiperChange(d) {
    dispatch(playIndex(d.detail.current))
  }

  return <Swiper
    className='swiper'
    previousMargin='100rpx'
    nextMargin='100rpx'
    current={pIndex}
    onChange={swiperChange}
  >
    {playList?.map((l, i) => <SwiperItem className='swiper_item'>
      <View className={`img_view card ${i === pIndex ? 'flex_top' : 'flex_bottom'}`}>
        <Image className='img' src={l.al.picUrl} />
      </View>
    </SwiperItem>)}
  </Swiper>
}



