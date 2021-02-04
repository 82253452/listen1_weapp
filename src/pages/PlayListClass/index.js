import {PLAY_CLASS} from "@/api";
import NavBar from "@/components/NavBar";
import usePlayListScrollPage from "@/utils/hook/usePlayListScrollPage";
import useQuery from "@/utils/hook/useQuery";
import {Image, ScrollView, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from '@tarojs/taro'
import React, {useState} from 'react'
import './index.less'


export default function () {

  console.log('PlayListClass')

  const [tag, setTag] = useState('')

  const {params} = useRouter()
  const {data = [],refetch} = usePlayListScrollPage(params.url,{cat:tag})

  function tagChange(name){
    refetch({cat:name})
  }

  return (
    <NavBar title='Listen1' back>
      <View className='container_filter'>
        <PlayClass tagChange={tagChange} />
        <PlayList data={data} />
      </View>
    </NavBar>
  )
}

function PlayList({data}) {

  function toDetail(id) {
    Taro.navigateTo({url: `/pages/playList/index?id=${id}`})
  }

  return <View className='play_list'>
    <View className='block_view'>
      {data?.map(l => <View className='block card' onClick={() => toDetail(l.id)}>
        <Image src={l.coverImgUrl} />
        {l.name}</View>)}
    </View>
  </View>
}

function PlayClass({tagChange}) {
  const [index, setIndex] = useState(-1)
  const {data = {}} = useQuery(PLAY_CLASS)

  function onPress(i) {
    setIndex(i)
    tagChange(i===-1?'':data.tags[i].name)
  }

  return <ScrollView scrollX className='tag_con'>
    <View className='tag_view_con_t'>
      <View className={`tag_view ${index === -1 ? 'card_n_strengthen' : 'card'}`} onClick={() => onPress(-1)}>
        全部
      </View>
      {data.tags?.map((l, i) => <View className={`tag_view ${index === i ? 'card_n_strengthen' : 'card'}`}
        onClick={() => onPress(i)}
      >
        {l.name}
      </View>)}
    </View>
  </ScrollView>
}
