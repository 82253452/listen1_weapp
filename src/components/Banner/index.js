import {Image, Swiper, SwiperItem, View} from "@tarojs/components";
import React from "react";
import './index.less'


export function Banner({list, onClick}) {
  return <Swiper
    className='swiper'
    circular
    autoplay
    previousMargin='50rpx'
    nextMargin='50rpx'
  >
    {list.map(l => <SwiperItem className='swiper_item'>
      <View className='img_view'>
        <Image className='img' src={l.src} onClick={onClick} />
        {/*123*/}
      </View>
    </SwiperItem>)}
  </Swiper>
}
