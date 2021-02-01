import {Banner} from "@/components/Banner";
import IconFont from "@/iconfont";
import {BOTTOM_GAP} from "@/utils/Const";
import {Image, Text, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import {useSelector} from "react-redux";
import './index.less'


export default function () {


  console.log('index')

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect


  return (
    <View className='container_filter'>
      <View className='header' style={{
        height: `${bottom + BOTTOM_GAP}px`,
        paddingLeft: `calc(100% - ${right}px)`,
        paddingBottom: `${BOTTOM_GAP}px`
      }}
      >
        <View className='title' style={{height: `${height}px`, width: `${width}px`}}>平租车</View>
      </View>
      <Banner
        list={[{src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2837709358,1998081016&fm=26&gp=0.jpg'}
          , {src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3666956482,58787135&fm=26&gp=0.jpg'}
          , {src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4118190389,3979581939&fm=26&gp=0.jpg'}]}
      />
      <Top />
      <CarList />
    </View>
  )
}

function Top() {
  function toPage(path){
    Taro.navigateTo({url:`/pages/${path}/index`})
  }
  return <View className='top_list'>
    <View className='top_item card_strengthen' onClick={()=>toPage('contract')}>
      <View className='block card_border'>
        <IconFont name='qichezulinershouchejiaoyiqicheweixiuqichexiangguan' color='#9EB6CE' size={30} style={{fontSize:'300px'}} />
      </View>
      <Text className='text'>汽车租赁</Text>
    </View>
    <View className='top_item card_strengthen'>
      <View className='block card_border'>
        <IconFont name='chepaishibie' color='#9EB6CE' size={30} />
      </View>
      <Text className='text'>车牌服务</Text>
    </View>
    <View className='top_item card_strengthen'>
      <View className='block  card_border'>
        <IconFont name='car' color='#9EB6CE' size={30} />
      </View>
      <Text className='text'>二手车</Text>
    </View>
    <View className='top_item card_strengthen'>
      <View className='block card_border'>
        <IconFont name='zixun' color='#9EB6CE' size={30} />
      </View>
      <Text className='text'>个人咨询</Text>
    </View>
  </View>
}

function CarList() {
  return <View className='car_list'>
    <View className='title card_border'>
      现有车型
    </View>
    <View className='car_block card'>
      <View className='car'>
        <View className='name'>思域</View>
        <View className='desc'>已经租出去了</View>
        <View className='price'>￥32.5</View>
      </View>
      <View className='block_img_view'>
          <Image className='img'
            src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2837709358,1998081016&fm=26&gp=0.jpg'
          />
      </View>
    </View>
    <View className='car_block card'>
      <View className='car'>
        <View className='name'>思域</View>
        <View className='desc'>已经租出去了</View>
        <View className='price'>￥32.5</View>
      </View>
      <View className='block_img_view'>
        <Image className='img'
          src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2837709358,1998081016&fm=26&gp=0.jpg'
        />
      </View>
    </View>
  </View>
}


