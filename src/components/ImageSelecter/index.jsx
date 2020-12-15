import {COMMON_TOKEN} from "@/api";
import {request} from "@/utils/request";
import {Image, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {useState} from "react";
import guanbi from "@/img/guanbi.png";
import './index.less'


export default function Index({max = 9, onChange, children, style, width=124, height=124, close, value,demo}) {
  const url = 'http://img.gz2c.com'
  const [images, setImages] = useState(value ? value.split(',') : []);


  async function addImg() {
    if (max && images.length >= max) {
      Taro.showToast({
        title: `最多上传${max}张图片`,
        icon: "none"
      })
      return
    }
    const res = await Taro.chooseImage({count: max - images.length})
    if (!res || !res.tempFilePaths) {
      return
    }
    Taro.showLoading({
      title: '上传中'
    })
    for (const e of res.tempFilePaths) {
      images.push(await uploadImg(e))
    }
    setImages([...images])
    Taro.hideLoading()
    onChange && onChange(images.join(','))
  }

  async function uploadImg(path) {
    const res = await Taro.uploadFile({
      url: 'https://upload-z2.qiniup.com',
      filePath: path,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: await request(COMMON_TOKEN),
      }
    })
    if (res.statusCode === 200) {
      return `${url}/${JSON.parse(res.data).key}`
    }
    return ''
  }

  function deleteImg(i) {
    images.splice(i, 1)
    setImages([...images])
  }

  return (
    <View className='img-container'>
      <View className='images-list' style={style}>
        {images.length?'':demo}
        {images.map((item, i) => <View key={i} className='close-view'>
          <Image className='image' src={item} style={`width:${width}rpx;height:${height}rpx`} />
          <Image className='close' src={guanbi} onClick={() => deleteImg(i)}
            style={max === 1 || !close ? 'display:none' : ''}
          />
        </View>)}
        <View className='addImg' style={images.length && max === 1 ? 'display:none' : ''}>
          <View onClick={addImg}>
            {children}
          </View>
        </View>

      </View>
    </View>
  )
}
