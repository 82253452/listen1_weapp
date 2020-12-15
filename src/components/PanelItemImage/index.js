import ImageSelecter from "@/components/ImageSelecter";
import {Image, Text, View} from "@tarojs/components";
import React from "react";
import upImg from "@/img/upImg.png";
import './index.less'

export default function ({title, value, onChange,desc}) {

  return <View className='panel_item_image'>
    <View className='title'>
      {title}
    </View>
    <View className='desc'>
      {desc}
    </View>
    <ImageSelecter value={value} onChange={onChange} demo={<View className='demo'>
      <View className='up-img' />
      <Text className='text'>查看示例</Text>
    </View>}
    >
      <View style={{marginLeft: '20rpx'}}>
        <Image src={upImg} style={{width: '124rpx', height: '124rpx'}} />
      </View>
    </ImageSelecter>
  </View>
}

