import {CAR_RENTAL_GET} from "@/api";
import NavBar from "@/components/NavBar";
import useQuery from "@/utils/hook/useQuery";
import {dateFormat} from "@/utils/utils";
import {Image, Swiper, SwiperItem, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from '@tarojs/taro'
import React from 'react'
import './index.less'

export default function () {
  const {params} = useRouter()
  const id = parseInt(params.id)
  const {data = {}} = useQuery(CAR_RENTAL_GET(id))

  return (
    <NavBar title='合同详情' back home>
      <View className='index'>
        <Banner data={data} />
        <PersonData data={data} />
        <CarData data={data} />
        <PersonDataImg data={data} />
        <PersonCardImg data={data} />
        <ContractDataImg data={data} />
        <CarDataImg data={data} />
        <DriversDataImg data={data} />
        <Remark data={data} />
      </View>
    </NavBar>
  )
}

function Banner({data}) {

  return data.carImg ? <Swiper
    previousMargin='20rpx'
    className='swiper'
    nextMargin='20rpx'
    indicatorDots
    circular
    autoplay
  >
    {data.carImg?.split(',')?.map(l => <SwiperItem>
      <View className='img_view'>
        <Image className='img' src={l} />
      </View>
    </SwiperItem>)}
  </Swiper> : <View />
}

function PersonData({data}) {
  return (
    <View className='block'>
      <View className='header'>
        租车人信息
      </View>
      <View className='item_info'>
        <View>姓名</View>
        <View>{data.personName}</View>
      </View>
      <View className='item_info'>
        <View>联系方式</View>
        <View>{data.personPhone}</View>
      </View>
      <View className='item_info'>
        <View>租赁时长</View>
        <View>{data.leaseDuration}个月</View>
      </View>
      <View className='item_info'>
        <View>押金</View>
        <View>￥{data.deposit}</View>
      </View>
      <View className='item_info'>
        <View>生效日期</View>
        <View>{dateFormat('Y-m-d', new Date(data.effectiveDate))}</View>
      </View>
      <View className='item_info'>
        <View>住址</View>
        <View>{data.personAddress}</View>
      </View>
    </View>
  )
}

function prevImg(src) {
  Taro.previewImage({
    current: src,
    urls: [src]
  })
}

function CarData({data}) {
  return data.carType ?
    <View className='block'>
      <View className='header'>
        车辆信息
      </View>
      <View className='item_info'>
        <View>车型</View>
        <View>{data.carType}</View>
      </View>
      <View className='item_info'>
        <View>租金</View>
        <View>￥{data.rentNumber}</View>
      </View>
      <View className='item_info'>
        <View>车牌号</View>
        <View>{data.carNumber}</View>
      </View>
      <View className='item_info'>
        <View>发动机号后六位</View>
        <View>{data.carEngineNumber}</View>
      </View>
    </View> : <View />

}

function PersonDataImg({data}) {
  return (
    <View className='block'>
      <View className='header'>
        本人照片
      </View>
      <View className='item_info item_info_img'>
        {data.personImg?.split(',').map(i => <Image src={i}  onClick={() => prevImg(i)} />)}
      </View>
    </View>
  )
}

function DriversDataImg({data}) {
  return (
    <View className='block'>
      <View className='header'>
        驾驶本照片
      </View>
      <View className='item_info item_info_img'>
        {data.driversLicenseImg?.split(',').map(i => <Image src={i} onClick={() => prevImg(i)} />)}
      </View>
    </View>
  )
}

function PersonCardImg({data}) {
  return (
    <View className='block'>
      <View className='header'>
        身份证照片
      </View>
      <View className='item_info item_info_img'>
        {data.personCardImg?.split(',').map(i => <Image src={i}  onClick={() => prevImg(i)} />)}
      </View>
    </View>
  )
}

function ContractDataImg({data}) {
  return data.contractImg ?
    <View className='block'>
      <View className='header'>
        合同照片
      </View>
      <View className='item_info item_info_img'>
        {data.contractImg?.split(',').map(i => <Image src={i}  onClick={() => prevImg(i)} />)}
      </View>
    </View> : <View />
}


function CarDataImg({data}) {
  return data.carImg ?
    <View className='block'>
      <View className='header'>
        车辆图片
      </View>
      <View className='item_info item_info_img'>
        {data.carImg?.split(',').map(i => <Image src={i}  onClick={() => prevImg(i)} />)}
      </View>
    </View> : <View />
}

function Remark({data}) {
  return data.remark ?
    <View className='block'>
      <View className='header'>
        备注
      </View>
      <View className='item_info item_info_img'>
        {data.remark}
      </View>
    </View> : <View />
}

