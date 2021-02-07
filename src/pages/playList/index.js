import {PLAY_LIST_DETAIL, PLAY_LIST_SONG_DETAIL} from "@/api";
import NavBar from "@/components/NavBar";
import IconFont from "@/iconfont";
import {addConnect, addFavorite, addPlayerAllAsync, addPlayerAsync} from "@/redux/music";
import useEffectOnece from "@/utils/hook/useEffectOnece";
import useQuery from "@/utils/hook/useQuery";
import useUpdateEffect from "@/utils/hook/useUpdateEffect";
import {request} from "@/utils/request";
import {Image, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './index.less'


export default function () {

  console.log('playList')

  const {params} = useRouter()
  const id = parseInt(params.id)

  const [tracks, setTracks] = useState([])

  const dispatch = useDispatch()
  const {connect} = useSelector(state => state.music)

  const {data = {}} = useQuery(PLAY_LIST_DETAIL, {id: id})

  const connectState = connect.some(c=>c.id===data?.playlist?.id)

  useUpdateEffect(async () => {
    const ids = data.playlist?.trackIds.map(l => l.id).join(',')
    if (ids) {
      const detail = await request(PLAY_LIST_SONG_DETAIL, {ids})
      setTracks(detail.songs)
      Taro.hideLoading()
    }
  }, [data])

  function playerAll() {
    dispatch(addPlayerAllAsync(tracks))
  }

  function conConnect(){
    dispatch(addConnect({id:data.playlist.id,name:data.playlist.name,img:data.playlist.coverImgUrl}))
  }

  return (
    <NavBar title='Listen1' back>
      <View className='container_filter'>
        <View className='player_top card_strengthen'>
          <View className='img'>
            <Image src={data?.playlist?.coverImgUrl} />
          </View>
          <View className='buttons'>
            <View className='name'>
              {data?.playlist?.name}
            </View>
            <View className='button_view'>
              <View className={`button ${connectState?'card_n':'card'}`} onClick={conConnect}>
                <IconFont name={`${connectState?'shoucangbeifen':'shoucang1'}`} size={26} />
              </View>
              <View className='button card' onClick={playerAll}>
                <IconFont name='bofang' size={26} />
              </View>
            </View>
          </View>
        </View>
        <PlayList tracks={tracks} />
      </View>
    </NavBar>
  )
}

function PlayList({tracks}) {

  const dispatch = useDispatch()
  const {playIndex, playList} = useSelector(state => state.music)


  //当前播放下标
  const [index, setIndex] = useState(0)


  useEffectOnece(() => {
    Taro.showLoading({title: '加载中'})
  })

  useUpdateEffect(() => {
    updateIndex()
  }, [playIndex, playList])

  async function updateIndex() {
    const currentTrack = playList[playIndex]
    if (currentTrack) {
      const trackIndex = tracks.findIndex(j => j.id === currentTrack.id)
      if (trackIndex !== -1) {
        setIndex(trackIndex)
      }
    }
  }

  async function onPlay(i) {
    dispatch(addPlayerAsync(tracks[i]))
  }


  return <View className='block_view'>
    {tracks?.map((l, i) => <Row l={l} i={i} card={i === index} onPlay={onPlay} />)}
  </View>
}

function Row({l, i, onPlay, card = false}) {

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const {play, favorite} = useSelector(state => state.music)

  const favoriteState = favorite.some(f=>f.id===l.id)

  useEffectOnece(() => {
    setTimeout(() => {
      Taro.createIntersectionObserver(this, {
        thresholds: [0],
        observeAll: true
      }).relativeToViewport().observe(`.obz_${i}`, res => {
        setShow(!!res.intersectionRatio)
      })
    }, 0)
  })

  function onFavorite(){
    dispatch(addFavorite(l))
  }

  return <View className={`obz_${i} block ${card ? 'card' : ''}`}>
    {show ? <View className='block_b'>
      <View className='left'>
        <Image src={l.al.picUrl} lazyLoad />
        <View className='name'>
          <Text>{l.name}</Text>
        </View>
      </View>
      <View className='right'>
        <View onClick={onFavorite} className={`like ${favoriteState?'card_n':'card'}`}>
          <IconFont name={`${favoriteState?'xihuan':'xihuan2'}`} size={26} />
        </View>
        <View className={`play ${play && card ? `card_n` : `card`}`} onClick={() => onPlay(i)}>
          <IconFont name={`${play && card ? `pause` : `bofang`}`} size={26} />
        </View>
      </View>
    </View> : null}
  </View>
}

